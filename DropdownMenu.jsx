import React from 'react';
import './DropdownMenu.css'; 

const DropdownMenu = ({ onOptionClick }) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">...</button>
      <div className="dropdown-content">
        <button onClick={() => onOptionClick('File Upload')}>File Upload</button>
      </div>
    </div>
  );
};

export default DropdownMenu;
