import React, { useState } from 'react';
import './Trainingmaterials.css';

// Modal Component for Adding More URLs
const AddMoreModal = ({ show, onClose, onAddMore }) => {
  const [moreUrls, setMoreUrls] = useState('');

  if (!show) return null;

  const handleAddMore = () => {
    const urlsArray = moreUrls.split(',').map(url => url.trim()).filter(url => url);  // Convert input to array and remove empty strings
    if (urlsArray.length) {
      onAddMore(urlsArray);
      setMoreUrls('');
      onClose();
    } else {
      alert('Please enter valid URLs.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Add More URLs</h4>
        <textarea
          placeholder="Enter additional URLs, separated by commas"
          value={moreUrls}
          onChange={(e) => setMoreUrls(e.target.value)}
          className="modal-textarea"
        />
        <button onClick={handleAddMore} className="modal-button confirm-button">Add More</button>
        <button onClick={onClose} className="modal-button cancel-button">Cancel</button>
      </div>
    </div>
  );
};

const WebsiteURL = ({ onUpload }) => {
  const [url, setUrl] = useState('');
  const [addMoreModalVisible, setAddMoreModalVisible] = useState(false);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const fetchUrl = () => {
    if (url.trim()) {
      onUpload(url);  // Pass the URL to the parent component
      alert(`Fetching URL: ${url}`);
      setUrl('');  // Clear the input after submission
    } else {
      alert('Please enter a valid URL.');
    }
  };

  const showAddMoreModal = () => {
    setAddMoreModalVisible(true);
  };

  const handleAddMoreUrls = (urls) => {
    urls.forEach(url => {
      onUpload(url);  // Pass each URL to the parent component
      alert(`Fetching URL: ${url}`);
    });
  };

  const handleCloseAddMoreModal = () => {
    setAddMoreModalVisible(false);
  };

  return (
    <div className="step">
      <div className="url-input-container">
        <input
          type="text"
          placeholder="Enter or paste the Website URL here"
          value={url}
          onChange={handleInputChange}
          className="url-input"
        />
        <button onClick={fetchUrl} className="fetch-button">Fetch URL</button>
        <button onClick={showAddMoreModal} className="add-more-button">Add More</button>
      </div>

      <AddMoreModal
        show={addMoreModalVisible}
        onClose={handleCloseAddMoreModal}
        onAddMore={handleAddMoreUrls}
      />
    </div>
  );
};

export default WebsiteURL;
