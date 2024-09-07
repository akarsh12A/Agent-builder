import React, { useState } from "react";
import "./BusinessGoles.css";
import myImage from "../assets/bg.jpg";
import {
  FaPencilAlt,
  FaPlus,
  FaPlusSquare,
  FaMinusSquare,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSave,
  FaTrash,
} from "react-icons/fa";

const HeadingAndTips = ({ onTipsClick }) => {
  return (
    <div className="heading-containerb">
      <h2 className="headingb">Business Goals</h2>
      <button className="tips-button" onClick={onTipsClick}>
        Examples & tips
      </button>
    </div>
  );
};

const BusinessGoles = () => {
  const [showTips, setShowTips] = useState(false);
  const [businessName, setBusinessName] = useState("Your Business Name");
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [placeholders, setPlaceholders] = useState([]);
  const [isPlaceholderEmpty, setIsPlaceholderEmpty] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLimitPopup, setShowLimitPopup] = useState(false);

  const handleBoxClick = () => {
    setShowTips(!showTips);
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setBusinessName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  const handleAddActionClick = () => {
    setShowActions(!showActions);
  };

  const handleActionClick = (action, id) => {
    let placeholderText = "";
    switch (action) {
      case "Schedule a Demo Meeting":
        placeholderText =
          "If users show interest, request to schedule a meeting at https://";
        break;
      case "Watch a Demo Video":
        placeholderText =
          "If users show interest, direct them to watch a demo video at https://";
        break;
      case "Give a Special Offer":
        placeholderText =
          "If users want to buy a product/service, provide them a coupon with the coupon code: X to get Y% off!";
        break;
      case "Direct to a Page":
        placeholderText =
          "If users want to learn more, direct them to a specific page at https://";
        break;
      case "Ask to Fill out a Form":
        placeholderText =
          "If users show interest, provide them a form link: https:// and request them to fill it out";
        break;
      case "Other":
        placeholderText = "Direct users...";
        break;
      default:
        placeholderText = "";
    }

    const newPlaceholder = {
      id: placeholders.length + 1,
      text: placeholderText,
      showControls: placeholders.length == 0,
      showOptions: false,
    };

    const updatedPlaceholders = placeholders.map((placeholder) =>
      placeholder.id === id
        ? { ...placeholder, showOptions: false }
        : placeholder
    );

    setPlaceholders([...updatedPlaceholders, newPlaceholder]);
    setShowActions(false);
  };

  const handleSave = () => {
    const firstPlaceholder = placeholders[0];
    if (firstPlaceholder.text.trim() === "") {
      setIsPlaceholderEmpty(true);
    } else {
      setIsPlaceholderEmpty(false);
      console.log("Save clicked");

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you wish to delete all call to actions?")
    ) {
      setPlaceholders([]);
    }
  };

  const handleSpecificDelete = (id) => {
    const updatedPlaceholders = placeholders.filter(
      (placeholder) => placeholder.id !== id
    );
    setPlaceholders(updatedPlaceholders);
  };

  const handleControlIconClick = (id) => {
    const updatedPlaceholders = placeholders.map((placeholder) =>
      placeholder.id === id
        ? { ...placeholder, showOptions: !placeholder.showOptions }
        : placeholder
    );
    setPlaceholders(updatedPlaceholders);
  };
  const lastPlaceholderId = placeholders.length
    ? placeholders[placeholders.length - 1].id
    : null;

  return (
    <div className="Appb">
      {showPopup && (
        <div className="popup-message">
          <FaCheckCircle className="popup-icon" />
          Successfully updated call to action!
        </div>
      )}
      <header className="App-header">
        <HeadingAndTips onTipsClick={handleBoxClick} />
      </header>
      {showTips && (
        <div className={`example-tips-content ${showTips ? "active" : ""}`}>
          <p>Examples & Tips</p>
          <p>✨ On this page, you can add call to actions for your agent.</p>
          <br />
          <p>
            ✨ A Call to Action is an event the agent will try to lead the user
            to take a specific action.
          </p>
          <br />
          <p>✨ See the example below for usage:</p>
          <img src={myImage} alt="Example Tips" />
          <button className="ok-button" onClick={handleBoxClick}>
            OK
          </button>
        </div>
      )}

      <p className="bot-info">
        Control how your bot responds to questions and messages. Tailor your own
        custom responses.
      </p>

      <div className="business-name-container">
        <div className="business-name-section">
          <span className="business-name-label">Business Name: </span>
          {isEditing ? (
            <input
              type="text"
              value={businessName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              className="business-name-input"
            />
          ) : (
            <span onClick={handleNameClick} className="business-name-text">
              {businessName}
              <FaPencilAlt className="edit-icon" />
            </span>
          )}
        </div>
        {placeholders.length === 0 && (
          <div className="add-action-box" onClick={handleAddActionClick}>
            <FaPlus className="plus-icon" /> Add Call to Action
          </div>
        )}
        {showActions && (
          <div className="action-buttons-container">
            <div
              className="action-option"
              onClick={() => handleActionClick("Schedule a Demo Meeting", null)}
            >
              Schedule a Demo Meeting
            </div>
            <div
              className="action-option"
              onClick={() => handleActionClick("Watch a Demo Video", null)}
            >
              Watch a Demo Video
            </div>
            <div
              className="action-option"
              onClick={() => handleActionClick("Give a Special Offer", null)}
            >
              Give a Special Offer
            </div>
            <div
              className="action-option"
              onClick={() => handleActionClick("Direct to a Page", null)}
            >
              Direct to a Page
            </div>
            <div
              className="action-option"
              onClick={() => handleActionClick("Ask to Fill out a Form", null)}
            >
              Ask to Fill out a Form
            </div>
            <div
              className="action-option"
              onClick={() => handleActionClick("Other", null)}
            >
              Other
            </div>
          </div>
        )}
        {placeholders.map((placeholder) => (
          <div key={placeholder.id} className="action-details">
            {placeholder.showControls && (
              <div className="action-buttons-top">
                <button className="save-button" onClick={handleSave}>
                  <FaSave className="button-icon" /> Save
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  <FaTrash className="button-icon" /> Delete
                </button>
              </div>
            )}
            <div
              className={`placeholder-container ${
                placeholder.text.trim() === "" ? "error" : ""
              }`}
            >
              <textarea
                className="placeholder-text"
                value={placeholder.text}
                onChange={(e) => {
                  const updatedPlaceholders = placeholders.map((p) =>
                    p.id === placeholder.id ? { ...p, text: e.target.value } : p
                  );
                  setPlaceholders(updatedPlaceholders);
                }}
              />
              {placeholder.text.trim() === "" && (
                <div className="error-message">
                  <FaExclamationTriangle className="error-icon" /> Please input
                  a call to action!
                </div>
              )}
            </div>
            <div className="controls">
              <div className="control-icons">
                {placeholder.id === lastPlaceholderId &&
                  placeholders.length < 15 && (
                    <FaPlusSquare
                      className="control-icon"
                      onClick={() => handleControlIconClick(placeholder.id)}
                    />
                  )}
                <FaMinusSquare
                  className="control-icon"
                  onClick={() => handleSpecificDelete(placeholder.id)}
                />
              </div>
              {placeholder.showOptions && (
                <div className="options-list">
                  <div
                    className="option"
                    onClick={() =>
                      handleActionClick(
                        "Schedule a Demo Meeting",
                        placeholder.id
                      )
                    }
                  >
                    Schedule a Demo Meeting
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleActionClick("Watch a Demo Video", placeholder.id)
                    }
                  >
                    Watch a Demo Video
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleActionClick("Give a Special Offer", placeholder.id)
                    }
                  >
                    Give a Special Offer
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleActionClick("Direct to a Page", placeholder.id)
                    }
                  >
                    Direct to a Page
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleActionClick(
                        "Ask to Fill out a Form",
                        placeholder.id
                      )
                    }
                  >
                    Ask to Fill out a Form
                  </div>
                  <div
                    className="option"
                    onClick={() => handleActionClick("Other", placeholder.id)}
                  >
                    Other
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessGoles;
