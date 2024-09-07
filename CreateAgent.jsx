import React, { useState } from "react";
import { ChromePicker } from "react-color";
import "./CreateAgent.css";
import { useNavigate } from "react-router-dom";

function CreateAgent() {
  const [url, setUrl] = useState("");
  const [domains, setDomains] = useState([]);
  const [showNewDomainInput, setShowNewDomainInput] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [businessName, setBusinessName] = useState("");
  const [isBusinessNameValid, setIsBusinessNameValid] = useState(true);
  const [gradientBorder, setGradientBorder] = useState(false);
  const [color, setColor] = useState("#43B75D");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [isAiNavEnabled, setIsAiNavEnabled] = useState(false);
  const [linksFetched, setLinksFetched] = useState(false);
  const [isWidgetView, setIsWidgetView] = useState(false);
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const colors = [
    "#ff9800",
    "#f44336",
    "#ffeb3b",
    "#8bc34a",
    "#00bcd4",
    "#2196f3",
    "#607d8b",
    "#e91e63",
    "#f06292",
    "#9c27b0",
    "#795548",
    "#3f51b5",
    "#4caf50",
    "#9e9e9e",
  ];

  const languages = ["English", "Spanish", "French", "German", "Chinese"];

  const fetchDomains = async () => {
    const sampleDomains = [
      "https://binged.live/watch/movie/1495",
      "https://binged.live/",
      "https://binged.live/@me?tab=watchlist",
      "https://binged.live/explore?type=movie",
    ];
    setDomains(sampleDomains);
    setLinksFetched(true);
    setShowPlaceholders(true); // Show placeholders after fetching links
  };

  const removeDomain = (indexToRemove) => {
    setDomains(domains.filter((_, index) => index !== indexToRemove));
  };

  const addNewDomain = () => {
    if (newDomain.trim() !== "") {
      setDomains([...domains, newDomain]);
      setNewDomain("");
      setShowNewDomainInput(false);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleBusinessNameChange = (e) => {
    setBusinessName(e.target.value);
    setIsBusinessNameValid(e.target.value.trim() !== "");
  };

  const handlePresetColorClick = (presetColor) => {
    setColor(presetColor);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleAiNavClick = () => {
    setIsAiNavEnabled(true);
    setIsWidgetView(false);
  };

  const handleWidgetClick = () => {
    setIsAiNavEnabled(false);
    setIsWidgetView(true);
  };

  const handleHowItWorksClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="create-agent-container">
      <div className="main-content">
        <div className="language-selector">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div className="center-divider"></div>
        <button className="back-button">← Go Back</button>
        <div className="create-agent-header">
          <div className="header-content">
            <h1>Create Agent</h1>
            <button
              className="how-it-works-button"
              onClick={handleHowItWorksClick}
            >
              See How It Works <span className="notification-dot"></span>
            </button>

            {linksFetched && (
              <div className="switch-container">
                <span
                  className={`switch-button ${
                    isAiNavEnabled ? "active" : "inactive"
                  }`}
                  onClick={handleAiNavClick}
                >
                  AI Nav
                </span>
                <span
                  className={`switch-button ${
                    !isAiNavEnabled ? "active" : "inactive"
                  }`}
                  onClick={handleWidgetClick}
                >
                  Widget
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="website-url">Your Website</label>
          <input
            type="text"
            id="website-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL"
          />
          <button className="fetch-links-button" onClick={fetchDomains}>
            Fetch Links
          </button>
        </div>

        {domains.length > 0 && (
          <div className="domains-list">
            <h2>
              We found the following links. You can add or delete links once you
              create your agent!
            </h2>
            <ul>
              {domains.map((domain, index) => (
                <li key={index}>
                  <input type="text" value={domain} readOnly />
                  <button onClick={() => removeDomain(index)}>-</button>
                </li>
              ))}
            </ul>

            {!showNewDomainInput && (
              <button
                className="add-domain-button"
                onClick={() => setShowNewDomainInput(true)}
              >
                +
              </button>
            )}

            {showNewDomainInput && (
              <div className="add-domain-input-group">
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="Add a new website URL"
                />
                <button onClick={addNewDomain}>Add URL</button>
              </div>
            )}

            <div className="business-name-group">
              <h3>
                Business Name <span className="required">*</span>
              </h3>
              <div className="business-name-input-group">
                <input
                  type="text"
                  value={businessName}
                  onChange={handleBusinessNameChange}
                  placeholder="Enter your business name"
                  className={isBusinessNameValid ? "" : "invalid"}
                />
                <select
                  className="languages-dropdown"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  {languages.map((language, index) => (
                    <option key={index} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              {!isBusinessNameValid && (
                <p className="error-message">Business Name is required.</p>
              )}
            </div>

            <div className="gradient-border-toggle">
              <label htmlFor="gradient-border">
                Gradient Border
                <input
                  type="checkbox"
                  id="gradient-border"
                  checked={gradientBorder}
                  onChange={(e) => setGradientBorder(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="color-picker">
              <label htmlFor="color">Color</label>
              <div className="color-picker-grid">
                {colors.map((presetColor, index) => (
                  <div
                    key={index}
                    className="color-swatch"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handlePresetColorClick(presetColor)}
                  ></div>
                ))}
                <div className="color-input">
                  <input
                    type="text"
                    value={color.toUpperCase()}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setDisplayColorPicker(!displayColorPicker)}
                >
                  Custom Color
                </button>
              </div>
              {displayColorPicker && (
                <div className="chrome-picker-wrapper">
                  <ChromePicker color={color} onChange={handleColorChange} />
                </div>
              )}
            </div>

            <button
              className="create-button"
              onClick={() => navigate("/dashboard")}
            >
              Create
            </button>
          </div>
        )}
      </div>

      <div className="right-placeholders">
        {showPlaceholders && // Render placeholders only if showPlaceholders is true
          (isWidgetView ? (
            <div
              className="large-placeholder"
              style={{
                border: gradientBorder
                  ? "2px solid transparent"
                  : `2px solid ${color}`,
                borderImage: gradientBorder
                  ? "linear-gradient(to right, #ff7e5f, #feb47b) 1"
                  : "none",
              }}
            >
              <div className="placeholder-text">Widget View Placeholder</div>
            </div>
          ) : (
            <>
              <div
                className="small-placeholder"
                style={{
                  border: gradientBorder
                    ? "2px solid transparent"
                    : `2px solid ${color}`,
                  borderImage: gradientBorder
                    ? "linear-gradient(to right, #ff7e5f, #feb47b) 1"
                    : "none",
                }}
              >
                <div className="placeholder-text">AI Nav Placeholder 1</div>
              </div>
              <div
                className="small-placeholder"
                style={{
                  border: gradientBorder
                    ? "2px solid transparent"
                    : `2px solid ${color}`,
                  borderImage: gradientBorder
                    ? "linear-gradient(to right, #ff7e5f, #feb47b) 1"
                    : "none",
                }}
              >
                <div className="placeholder-text">AI Nav Placeholder 2</div>
              </div>
              <div
                className="small-placeholder"
                style={{
                  border: gradientBorder
                    ? "2px solid transparent"
                    : `2px solid ${color}`,
                  borderImage: gradientBorder
                    ? "linear-gradient(to right, #ff7e5f, #feb47b) 1"
                    : "none",
                }}
              >
                <div className="placeholder-text">AI Nav Placeholder 3</div>
              </div>
            </>
          ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
          >
            <h2>How It Works</h2>
            <p>
              This is where you explain how your agent works. Include all the
              important information that users need to know.
            </p>
            <button className="modal-close-button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAgent;
