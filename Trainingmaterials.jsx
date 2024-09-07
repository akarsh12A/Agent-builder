import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import WebsiteUrl from './WebsiteUrl';
import SiteMap from './SiteMap';
import TextInput from './TextInput';
import DropdownMenu from './DropdownMenu';
import HeadingandTips from './HeadingandTips';
import StepTwo from './StepTwo';
import './Trainingmaterials.css';

const Trainingmaterials = () => {
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [websiteUrls, setWebsiteUrls] = useState([]);
  const [sitemaps, setSitemaps] = useState([]);
  const [texts, setTexts] = useState([]);
  const [activeTab, setActiveTab] = useState('File Upload');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleWebsiteUrlUpload = (url) => {
    setWebsiteUrls((prevUrls) => [...prevUrls, url]);
  };

  const handleSitemapUpload = (sitemap) => {
    setSitemaps((prevSitemaps) => [...prevSitemaps, sitemap]);
  };

  const handleTextUpload = (text) => {
    setTexts((prevTexts) => [...prevTexts, text]);
  };

  const triggerFileUpload = () => {
    document.getElementById('file-upload').click();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="main-content">
      <HeadingandTips onTipsClick={openModal} />
      <div className="container">
        <div className="upload-box">
          <div className="step">
            <h3>Step 1: Upload</h3>
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'File Upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('File Upload')}
              >
                File Upload
              </button>
              <button
                className={`tab ${activeTab === 'Website URL' ? 'active' : ''}`}
                onClick={() => setActiveTab('Website URL')}
              >
                Website URL
              </button>
              <button
                className={`tab ${activeTab === 'Site Map' ? 'active' : ''}`}
                onClick={() => setActiveTab('Site Map')}
              >
                Site Map
              </button>
              <button
                className={`tab ${activeTab === 'Text' ? 'active' : ''}`}
                onClick={() => setActiveTab('Text')}
              >
                Text
              </button>
              <DropdownMenu onOptionClick={handleOptionClick} />
            </div>
            {activeTab === 'File Upload' && (
              <div className="upload-area" onClick={triggerFileUpload}>
                <div className="upload-icon">
                  <FontAwesomeIcon icon={faUpload} />
                </div>
                <input
                  type="file"
                  accept=".pdf,.csv,.docx,.txt"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label className="file-upload-label" htmlFor="file-upload">
                  Click or drag file to this area to upload
                </label>
                <p>Drag and drop your PDF, CSV, DOCX, or TXT file here, or click to select it. (40 MB limit)</p>
                {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>}
              </div>
            )}
            {activeTab === 'Website URL' && <WebsiteUrl onUpload={handleWebsiteUrlUpload} />}
            {activeTab === 'Site Map' && <SiteMap onUpload={handleSitemapUpload} />}
            {activeTab === 'Text' && <TextInput onUpload={handleTextUpload} />}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Tips</h2>
            <p>✨ Fetch training materials via one file uploading (TXT, PDF, CSV, or DOCX files) to URL fetching or site maps.</p>
            <p>✨ Train your material through the train section. You're free to add, remove, and retrain materials on hand!</p>
            <p>✨ To further fine-tune its responses, consider adding or editing other skills in the "Agent" section, such as FAQs.</p>
            <button className="ok-button" onClick={closeModal}>OK</button>
          </div>
        </div>
      )}

      <StepTwo
        uploadedFileName={uploadedFileName}
        websiteUrls={websiteUrls}
        sitemaps={sitemaps}
        texts={texts}
      />
    </div>
  );
};

export default Trainingmaterials;
