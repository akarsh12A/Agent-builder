import React, { useState } from "react";
import "./qualifyleads.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faTimes } from '@fortawesome/free-solid-svg-icons';


const INITIAL_QUESTIONS = [
  "What is your name?",
  "What is your email address?",
  "How can we assist you today?",
  "What is your preferred contact method?",
  "What product are you interested in?",
];

const getQuestionType = (question) => {
  if (question.toLowerCase().includes("name")) {
    return "(Name)";
  } else if (question.toLowerCase().includes("email")) {
    return "(Email)";
  } else if (question.toLowerCase().includes("contact")) {
    return "(Number)";
  } else {
    return "(Question)";
  }
};

const Qualifypage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showInactivePopup, setShowInactivePopup] = useState(false);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [activeToggles, setActiveToggles] = useState({});

  const handleBoxClick = () => {
    setShowMessage(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const handleToggle = () => {
    if (!isActive) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setShowInactivePopup(true);
    }
    setIsActive(!isActive);
  };

  const handleAddQuestion = () => {
    const question = prompt("Enter the question:");
    if (question) {
      setQuestions([...questions, question]);
      setShowQuestionPopup(true);
      setTimeout(() => {
        setShowQuestionPopup(false);
      }, 2000);
    }
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
    const newToggles = { ...activeToggles };
    delete newToggles[index];
    setActiveToggles(newToggles);
    setShowDeletePopup(true);
    setTimeout(() => {
      setShowDeletePopup(false);
    }, 2000);
  };

  const handleToggleChange = (index) => {
    const newToggles = { ...activeToggles, [index]: !activeToggles[index] };
    setActiveToggles(newToggles);
    if (newToggles[index]) {
      setShowQuestionPopup(true);
      setTimeout(() => {
        setShowQuestionPopup(false);
      }, 2000);
    }
  };

  const handleSaveQuestions = () => {
    console.log("Questions saved:", questions);
    setShowSavePopup(true);
    setTimeout(() => {
      setShowSavePopup(false);
    }, 2000);
  };

  const closeInactivePopup = () => {
    setShowInactivePopup(false);
  };

  const handlePopupToggle = () => {
    setIsActive(true);
    setShowInactivePopup(false);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="Qualify-container">
      <header className="Qualify-header">
        <div className="Qualify-header-content">
          <h1 className={`Qualify-header-title ${isActive ? 'dark-mode' : 'light-mode'}`}>
            Qualify Leads
          </h1>
          <div className="Qualify-example-tips-box" onClick={handleBoxClick}>
            Examples & Tips
          </div>
        </div>
        <p className="bot-info">Configure your agent to ask custom questions in the following order to gain customer insights.</p>
      </header>

      <div className="toggle-containerQ">
        <span className="toggle-label">{isActive ? 'Active' : 'Inactive'}</span>
        <label className="toggle-switch">
          <input type="checkbox" checked={isActive} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="Qualify-questions-box">
        <div className="Qualify-questions-header">
          <div className="Qualify-question-column">Question</div>
          <div className="Qualify-middle-column"></div> {/* Middle column content */}
          <div className="Qualify-enabled-column">Enabled</div>
        </div>
        {questions.map((question, index) => (
          <div className="Qualify-question-row" key={index}>
            <div className="Qualify-question-column">{`🍱 ${question}`}</div>
            <div className="Qualify-middle-column">{getQuestionType(question)}</div>
            <div className="Qualify-enabled-column">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={activeToggles[index] || false}
                  onChange={() => handleToggleChange(index)}
                />
                <span className="slider"></span>
              </label>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="delete--icon"
                onClick={() => handleDeleteQuestion(index)}
              />
            </div>
          </div>
        ))}
        <div className="Qualify-button-container">
          <button className="Qualify-add-button" onClick={handleAddQuestion}>Add</button>
          <button className="Qualify-save-button" onClick={handleSaveQuestions}>Save</button>
        </div>
      </div>

      {showMessage && (
        <div className="message-box">
          <p>Examples & Tips:</p>
          <ul>
            <div>✨ On this page, you can lead questions for your agent.</div>
            <div>✨ These questions are here to collect information towards your visitors to generate leads. Here is an example configuration:</div>
          </ul>
          <div className="image-box">
            <img src={myImage} alt="Description of myimage" />
          </div>
          
          <button className="mani" onClick={handleCloseMessage}>OK</button>
          
        </div>
      )}

      {showPopup && (
        <div className="popup-message">
          ✔️ Successfully updated lead insights questions!
        </div>
      )}

      {showQuestionPopup && (
        <div className="popup-message">
          ✔️ Question is added!
        </div>
      )}

      {showDeletePopup && (
        <div className="popup-message">
          ✔️ Question is deleted!
        </div>
      )}

      {showSavePopup && (
        <div className="popup-message">
          ✔️ Questions have been saved!
        </div>
      )}

      {showInactivePopup && (
        <div className="inactive-popup">
          <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={closeInactivePopup} />
          <h2>⛔ Lead Insights is not enabled</h2>
          <p>Qualify Leads is not enabled! Make sure to toggle "Active" on to use Qualify Leads.</p>
          <div className="inactive-toggle">
            <label className="toggle-switch">
              <input type="checkbox" checked={false} onChange={handlePopupToggle} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      )}

      <div className="footer-info">
        <span className="leads-count">Captured Leads: 0 / 5</span>
        <button className="upgrade-button">Upgrade Plan</button>
      </div>
    </div>
  );
};

export default Qualifypage;