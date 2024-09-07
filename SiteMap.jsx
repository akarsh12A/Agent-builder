import React, { useState } from 'react';
import './Trainingmaterials.css'; 

const SiteMap = ({ onUpload }) => {
  const [siteMap, setSiteMap] = useState('');

  const handleInputChange = (event) => {
    setSiteMap(event.target.value);
  };

  const addSiteMap = () => {
    if (siteMap.trim()) {
      onUpload(siteMap);  // Pass the site map URL to the parent component
      alert(`Adding Site Map: ${siteMap}`);
      setSiteMap('');  // Clear the input after submission
    } else {
      alert('Please enter a valid Site Map URL.');
    }
  };

  return (
    <div className="step">
      <div className="url-input-container">
        <input
          type="text"
          placeholder="Enter or paste Site Map URL here"
          value={siteMap}
          onChange={handleInputChange}
          className="url-input"
        />
        <button onClick={addSiteMap} className="fetch-button">Add Site Map</button>
      </div>
    </div>
  );
};

export default SiteMap;

