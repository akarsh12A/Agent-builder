import React from 'react';
import './Trainingmaterials.css'; 
const HeadingAndTips = ({ onTipsClick }) => {
  return (
    <div className="heading-container">
      <h2 className="heading">Training Materials</h2>
      <button className="tips-button" onClick={onTipsClick}>
        Tips
      </button>
    </div>
  );
};

export default HeadingAndTips;
