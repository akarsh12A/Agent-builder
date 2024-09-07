import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashAlt, faRedo, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './StepTwo.css';

// Modal Component for Delete Confirmation
const DeleteModal = ({ show, onClose, onConfirm, item }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Are you sure you want to delete this training material?</h4>
        <p>{item}</p>
        <button onClick={onConfirm} className="modal-button confirm-button">Confirm</button>
        <button onClick={onClose} className="modal-button cancel-button">Cancel</button>
      </div>
    </div>
  );
};

// Function to remove content within brackets
const removeBracketsContent = (text) => {
  return text.replace(/\[.*?\]/g, '').trim();
};

// Modal Component for File Detail
const FileDetailModal = ({ show, onClose, item, itemType }) => {
  if (!show) return null;

  return (
    <div className="file-detail-modal-overlay">
      <div className="file-detail-modal-content">
        <h4>{itemType} Details</h4>
        <p>{removeBracketsContent(item)}</p>
        <button onClick={onClose} className="file-detail-modal-button">Close</button>
      </div>
    </div>
  );
};

const StepTwo = ({ uploadedFileName, websiteUrls, sitemaps, texts }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [fileDetailModalVisible, setFileDetailModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');
  const [itemToView, setItemToView] = useState('');
  const [itemType, setItemType] = useState('');  // State to handle item type for modal heading
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // State to handle the search query

  const showDeleteModal = (item) => {
    setItemToDelete(item);
    setDeleteModalVisible(true);
  };

  const showFileDetail = (item, type) => {
    setItemToView(item);
    setItemType(type);  // Set the item type for dynamic heading
    setFileDetailModalVisible(true);
  };

  const handleDelete = () => {
    alert(`Deleting ${itemToDelete}`);
    // Add your delete logic here
    setDeleteModalVisible(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setItemToDelete('');
  };

  const handleCloseFileDetailModal = () => {
    setFileDetailModalVisible(false);
    setItemToView('');
  };

  const handleSelectAllUntrained = () => {
    const untrainedItems = [];

    if (uploadedFileName) untrainedItems.push(uploadedFileName);
    untrainedItems.push(...websiteUrls, ...sitemaps);
    untrainedItems.push(...texts.map(text => text.title));

    setSelectedItems(untrainedItems);
  };

  const handleSelectAll = () => {
    const allItems = [];

    if (uploadedFileName) allItems.push(uploadedFileName);
    allItems.push(...websiteUrls, ...sitemaps);
    allItems.push(...texts.map(text => text.title));

    setSelectedItems(allItems);
  };

  const isItemSelected = (item) => selectedItems.includes(item);

  const handleCheckboxChange = (item) => {
    if (isItemSelected(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter items based on the search query
  const filterItems = (item) => {
    return item.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Function to handle training of selected items
  const handleTrain = () => {
    if (selectedItems.length === 0) {
      alert('No materials selected for training.');
      return;
    }

    // Logic to train the selected items
    selectedItems.forEach((item) => {
      console.log(`Training ${item}`);
      // Implement your training logic here
    });

    alert(`Training initiated for: ${selectedItems.join(', ')}`);
  };

  // Function to handle training of a specific item
  const handleTrainItem = (item) => {
    console.log(`Training ${item}`);
    // Implement your specific training logic here

    alert(`Training initiated for: ${item}`);
  };

  // Combine all items and limit to 50
  const allItems = useMemo(() => {
    const items = [];
    if (uploadedFileName) items.push(uploadedFileName);
    items.push(...websiteUrls, ...sitemaps);
    items.push(...texts.map(text => text.title));
    return items.slice(0, 50); // Limit to 50 items
  }, [uploadedFileName, websiteUrls, sitemaps, texts]);

  // Display the count of items (e.g., "8/50")
  const displayedCount = allItems.length;
  const totalItemsCount = 50; // Maximum items displayed

  return (
    <div className="step-two-container">
      <h3>Step 2: Manage Training Materials ({displayedCount}/{totalItemsCount})</h3>
      <div className="button-group">
        <div className="left-buttons">
          <button className="btn select-untrained" onClick={handleSelectAllUntrained}>
            Select All Untrained
          </button>
          <button className="btn select-all" onClick={handleSelectAll}>
            Select All
          </button>
        </div>
        <button
          className="train-button"
          title="Re-train Selected"
          onClick={handleTrain}  // Training function
        >
          Train
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search training materials..."
          aria-label="Search training materials"
          value={searchQuery}
          onChange={handleSearchChange}  // Handle search input changes
        />
        <div className="input-divider"></div>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      {allItems.length === 0 ? (
        <div className="no-data">
          <FontAwesomeIcon icon={faExclamationTriangle} className="no-data-icon" />
          <p>No training materials available.</p>
        </div>
      ) : (
        <div className="material-list">
          <div className="material-header">
            <span>Select</span>
            <span>Training Material</span>
            <span>Type</span>
            <span>Characters</span>
            <span>Status</span>
            <span>Last Trained</span>
            <span>Re-Train</span>
            <span>Delete</span>
          </div>
          <div className="material-rows">
            {allItems.filter(filterItems).map((item, index) => {
              // Determine item type
              const itemType = uploadedFileName === item ? 'File' : 
                               websiteUrls.includes(item) ? 'URL' : 
                               sitemaps.includes(item) ? 'Sitemap' : 
                               'Text';

              return (
                <div key={index} className="material-row">
                  <span>
                    <input
                      type="checkbox"
                      checked={isItemSelected(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </span>
                  <span onClick={() => showFileDetail(item, itemType)} className="file-name">
                    {item}
                  </span>
                  <span>{itemType}</span>
                  <span>N/A</span>
                  <span>Untrained</span>
                  <span>N/A</span>
                  <span>
                    <FontAwesomeIcon 
                      icon={faRedo} 
                      className="repeat-icon" 
                      title="Re-train"
                      onClick={() => handleTrainItem(item)}  // Trigger specific item training
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon 
                      icon={faTrashAlt} 
                      className="delete-icon" 
                      onClick={() => showDeleteModal(item)} 
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <DeleteModal
        show={deleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        item={itemToDelete}
      />

      <FileDetailModal
        show={fileDetailModalVisible}
        onClose={handleCloseFileDetailModal}
        item={itemToView}
        itemType={itemType}  // Pass item type for dynamic modal heading
      />
    </div>
  );
};

export default StepTwo;
