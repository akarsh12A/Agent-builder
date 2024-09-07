import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaEye,
  FaRobot,
  FaBook,
  FaChartLine,
  FaDollarSign,
  FaQuestionCircle,
  FaBolt,
  FaAddressBook,
  FaComments,
  FaCog,
  FaPuzzlePiece,
  FaLifeRing,
  FaBookOpen,
  FaPlus,
  FaCaretDown,
} from "react-icons/fa";
import logo from "./assets/WhatsApp Image 2024-08-05 at 16.07.23_2bc8e5cc.jpg";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={`app-container ${isCollapsed ? "collapsed" : "expanded"}`}>
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Crecientech Logo" className="logo" />
          {!isCollapsed && <h2>Crecientech</h2>}
        </div>
        {!isCollapsed && (
          <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
              <span className="dropdown-title">Crecientech</span>
              <FaCaretDown
                className={`dropdown-icon ${dropdownOpen ? "open" : ""}`}
              />
            </div>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <FaPlus /> <span>Create New Agent</span>
                </li>
                <li>Crecientech</li>
              </ul>
            )}
          </div>
        )}
        <ul>
          <li>
            <FaHome /> <span>Dashboard</span>
          </li>
          <li>
            <FaEye /> <span>Appearance</span>
          </li>
          <li>
            <FaRobot /> <span>Try My AI Agent</span>
          </li>
          <div className="section-title">AI Agent</div>
          <li>
            <FaBook /> <span>Training Materials</span>
          </li>
          <li>
            <FaChartLine /> <span>Business Goals</span>
          </li>
          <li>
            <FaDollarSign /> <span>Qualify Leads</span>
          </li>
          <li>
            <FaQuestionCircle /> <span>Question & Answer</span>
          </li>
          <div className="section-title">GENERAL</div>
          <li>
            <FaBolt /> <span>Upgrade</span>
          </li>
          <li>
            <FaAddressBook /> <span>Captured Contacts</span>
          </li>
          <li>
            <FaComments /> <span>Conversations</span>
          </li>
          <li>
            <FaCog /> <span>Advanced</span>
          </li>
          <li>
            <FaPuzzlePiece /> <span>Integrations</span>
          </li>
          <li>
            <FaLifeRing /> <span>Help Center</span>
          </li>
          <li>
            <FaBookOpen /> <span>Languages</span>
          </li>
        </ul>
        <div className="toggle-container">
          <button onClick={toggleSidebar} className="toggle-button">
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
      </div>
      <div className="main-content">
        {/* Main content goes here */}
      </div>
    </div>
  );
}

export default Sidebar;
