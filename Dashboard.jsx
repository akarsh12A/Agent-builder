import React, { useState, useEffect, useRef } from "react";
import {
  FaLock,
  FaUnlock,
  FaShareAlt,
  FaUser,
  FaStar,
  FaComments,
  FaUsers,
  FaHandPaper,
  FaChartLine,
  FaCopy,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Dashboard.css";
import { Calendar } from "primereact/calendar";
import chartImage from "../assets/Graph.png";
import screenshotImage1 from "../assets/img1.png";
import screenshotImage2 from "../assets/img2.png";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useNavigate, Link } from "react-router-dom";
import UserSettings from "./UserSettings";

function Dashboard() {
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isAiNavEnabled, setIsAiNavEnabled] = useState(true);
  const [isEmbedSectionCollapsed, setIsEmbedSectionCollapsed] = useState(true);
  const [isFreePlanPopupVisible, setFreePlanPopupVisible] = useState(false);
  const [isAnalyticsPopupOpen, setIsAnalyticsPopupOpen] = useState(false);
  const [isGtmPopupOpen, setIsGtmPopupOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState("Last 7 Days");

  const shareButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const freePlanButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/user-settings");
  };

  useEffect(() => {
    const shareButton = shareButtonRef.current;
    const closeButton = closeButtonRef.current;

    if (shareButton && closeButton) {
      shareButton.addEventListener("click", () => {
        document.getElementById("share-popup-overlay").classList.add("active");
      });

      closeButton.addEventListener("click", () => {
        document
          .getElementById("share-popup-overlay")
          .classList.remove("active");
      });

      return () => {
        shareButton.removeEventListener("click", () => {
          document
            .getElementById("share-popup-overlay")
            .classList.add("active");
        });

        closeButton.removeEventListener("click", () => {
          document
            .getElementById("share-popup-overlay")
            .classList.remove("active");
        });
      };
    }
  }, []);

  const handleLockClick = () => {
    setShowPasswordPopup(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handlePasswordSubmit = () => {
    setIsLocked(true);
    setShowPasswordPopup(false);
  };

  const handlePopupClose = () => {
    setShowPasswordPopup(false);
  };

  const handleAiNavClick = () => {
    setIsAiNavEnabled(true);
  };

  const handleWidgetClick = () => {
    setIsAiNavEnabled(false);
  };

  const toggleEmbedSection = () => {
    setIsEmbedSectionCollapsed(!isEmbedSectionCollapsed);
  };

  const toggleAnalyticsPopup = () => {
    setIsAnalyticsPopupOpen(!isAnalyticsPopupOpen);
  };

  const confirmDeletion = () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this agent? This action cannot be undone."
      )
    ) {
      alert("Agent deleted successfully.");
    }
  };

  const toggleFreePlanPopup = () => {
    setFreePlanPopupVisible(!isFreePlanPopupVisible);
  };

  const toggleGtmPopup = () => {
    setIsGtmPopupOpen(!isGtmPopupOpen);
  };

  useEffect(() => {
    const dropdownToggle = document.getElementById("dateRangeDropdown");
    const dropdownMenu = dropdownToggle?.nextElementSibling;

    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
      });

      document.addEventListener("click", (e) => {
        if (!dropdownToggle.contains(e.target)) {
          dropdownMenu.classList.remove("show");
        }
      });

      return () => {
        dropdownToggle.removeEventListener("click", () => {
          dropdownMenu.classList.toggle("show");
        });

        document.removeEventListener("click", (e) => {
          if (!dropdownToggle.contains(e.target)) {
            dropdownMenu.classList.remove("show");
          }
        });
      };
    }
  }, []);

  const handleDateRangeSelect = (range) => {
    setSelectedRange(range);
    document.getElementById("dateRangeDropdown").click();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="title-container">
          <h2 className="dashboard-title">Crecientech</h2>
          {isLocked ? (
            <div className="tooltip-lock">
              <FaLock className="lock-icon" onClick={handleLockClick} />
              <span className="tooltiptext">Set Agent Password</span>
            </div>
          ) : (
            <div className="tooltip-lock">
              <FaUnlock className="lock-icon" onClick={handleLockClick} />
              <span className="tooltiptext">Set Agent Password</span>
            </div>
          )}
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
        </div>
        <div className="header-buttons">
          <button className="share-ai-button" ref={shareButtonRef}>
            <FaShareAlt /> Share My AI
          </button>
          <div className="free-plan-container">
            <button
              className="free-plan-button"
              onClick={toggleFreePlanPopup}
              ref={freePlanButtonRef}
            >
              <FaUser /> FREE PLAN
            </button>
            {isFreePlanPopupVisible && (
              <div className="free-plan-popup">
                <span className="free-plan-user">USER-NAME</span>
                <div className="free-plan-menu">
                  <button
                    className="profile-button"
                    onClick={handleProfileClick}
                  >
                    <FaUser /> Profile
                  </button>
                  <button className="logout-button">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="share-popup-overlay" id="share-popup-overlay">
        <div className="share-popup">
          <button
            className="close-button"
            id="close-button"
            ref={closeButtonRef}
          >
            &#x2715;
          </button>
          <h3>Share my AI</h3>
          <p>
            To add your AI to your website, visit your{" "}
            <a href="/dashboard">dashboard</a> for instructions, or
            <a href="/try">try it out here!</a>
          </p>
          <div className="share-url">
            <input
              type="text"
              readOnly
              value="https://app.chatsimple.ai/sh/copilot/cba093ab"
            />
            <button className="copy-button">
              <FaCopy />
            </button>
          </div>
          <div className="handle-section">
            <label>Set your URL handle</label>
            <div className="url-handle">
              <span>#</span>
              <input type="text" value="cba093ab" readOnly />
            </div>
          </div>
          <div className="qr-section">
            <div className="qr-label">
              <label>Scan QR Code</label>
            </div>
            <div className="qr-code">
              <img src="src\assets\QR.jpg" alt="QR Code" />
            </div>
          </div>
          <div className="share-buttons">
            <button className="facebook-button">
              <FaFacebook /> Facebook
            </button>
            <button className="twitter-button">
              <FaTwitter /> Twitter
            </button>
            <button className="linkedin-button">
              <FaLinkedin /> LinkedIn
            </button>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-header">
          <h2>
            <FaChartLine /> Statistics
          </h2>
          <div className="total-automated-responses">
            <div className="tooltip">
              Total Automated Responses: <strong>0</strong>
              <span className="tooltiptext">
                Note: An agent response with multiple messages is treated as 1
                response
              </span>
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-header">
              <FaStar />
              <div className="tooltip">
                <span>Response Usage</span>
                <span className="tooltiptext">
                  Different types of responses use credits at different rates
                </span>
              </div>
              <a href="#upgrade">Upgrade</a>
            </div>
            <p>0 / 200</p>
          </div>
          <div className="stat">
            <div className="stat-header">
              <FaComments /> <span>Conversations</span>
              <a href="#view">View</a>
            </div>
            <p>0</p>
          </div>
          <div className="stat">
            <div className="stat-header">
              <FaUsers /> <span>Leads</span>
              <a href="#view">View</a>
            </div>
            <p>0</p>
            <small>Renewal: N/A</small>
          </div>
          <div className="stat">
            <div className="stat-header">
              <FaHandPaper /> <span>Total Interactions</span>
            </div>
            <p>0</p>
          </div>
        </div>
      </div>

      <div className="embed-section">
        <div className="embed-header">
          <h3>&lt; &gt; Add to Website</h3>
          <div className="embed-buttons">
            <button className="embed-button" onClick={toggleGtmPopup}>
              Embed using GTM
            </button>
            <button className="embed-button" onClick={toggleAnalyticsPopup}>
              Get Advanced Analytics
            </button>
          </div>
        </div>
        <hr
          className="embed-header-border"
          style={{ display: isEmbedSectionCollapsed ? "none" : "block" }}
        />
        <button className="expand-collapse-button" onClick={toggleEmbedSection}>
          <i
            className={`fas ${
              isEmbedSectionCollapsed ? "fa-plus" : "fa-minus"
            }`}
          ></i>
        </button>
        {!isEmbedSectionCollapsed && (
          <>
            <p>
              To embed your agent onto your website, paste this snippet into
              your website's HTML file, right before the closing body tag (
              <code>&lt;/body&gt;</code>). For other website management systems,
              check out our tutorials or <a href="#">book a meeting with us</a>.
            </p>
            <p className="warning-text">
              Warning: Your agent is on our FREE PLAN and has a message limit of
              200 credits. Once used, your agent will stop responding to
              customers 24/7. <a href="#">Upgrade your plan</a> for more message
              credits.
            </p>
            <div className="embed-code">
              <code>
                &lt;co-pilot platform-id="37d246d0-c713-4150-971b-75ac96b5975a"
                user-id="ad7a1644-02d0-4a57-9b59-5166024c5de1"
                chatbot-id="07807889-dbf5-4e72-a1f1-7c6e798f5d5e"&gt;&lt;/co-pilot&gt;
              </code>
              <button className="copy-button">Copy</button>
            </div>
          </>
        )}
        {isAnalyticsPopupOpen && (
          <div className="analytics-popup-overlay">
            <div className="analytics-popup">
              <button
                className="analytics-popup-close"
                onClick={toggleAnalyticsPopup}
              >
                &times;
              </button>
              <h2>Get Advanced Analytics</h2>
              <p>
                Analyze chatsimple activity in your Google Analytics Dashboard
                (and more) using our Google Tag Manager Integration.
              </p>
              <img
                src={screenshotImage2}
                alt="Analytics Example"
                className="analytics-image"
              />
              <a href="#" className="setup-guide-link">
                The 5 minute set-up guide
              </a>
              <button
                className="analytics-popup-ok"
                onClick={toggleAnalyticsPopup}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {isGtmPopupOpen && (
          <div className="analytics-popup-overlay">
            <div className="analytics-popup">
              <button
                className="analytics-popup-close"
                onClick={toggleGtmPopup}
              >
                &times;
              </button>
              <h2>Embed using GTM</h2>
              <p>
                Discover more ways to incorporate Chatsimple into your website.
              </p>
              <p>
                ✨ If you want to embed the agent into your website using Google
                Tag Manager, check out our guide <a href="#">here</a>. You'll
                need to use the following code snippet instead.
              </p>
              <img
                src={screenshotImage1}
                alt="GTM Embed Code"
                className="analytics-image"
              />
              <button className="copy-button">Copy</button>
              <button className="analytics-popup-ok" onClick={toggleGtmPopup}>
                Ok
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="insights-section">
        <div className="insights-content">
          <div className="insights-header">
            <h3>
              <i className="fas fa-desktop"></i> Chatsimple Insights
            </h3>
            <div className="date-range-controls">
              <div className="date-picker-container">
                <div className="start-date-container">
                  <i className="fas fa-calendar calendar-icon"></i>
                  <Calendar
                    value={startDate}
                    onChange={(e) => setStartDate(e.value)}
                    placeholder="Start date"
                    showButtonBar
                    inputClassName="date-picker start-date"
                  />
                </div>
                <div className="date-range-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
                <div className="end-date-container">
                  <i className="fas fa-calendar calendar-icon"></i>
                  <Calendar
                    value={endDate}
                    onChange={(e) => setEndDate(e.value)}
                    placeholder="End date"
                    showButtonBar
                    inputClassName="date-picker end-date"
                  />
                </div>
                <div className="dropdown">
                  <button className="dropdown-toggle" id="dateRangeDropdown">
                    {selectedRange} <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dateRangeDropdown"
                  >
                    <li onClick={() => handleDateRangeSelect("Last 7 Days")}>
                      <a href="#">Last 7 Days</a>
                    </li>
                    <li onClick={() => handleDateRangeSelect("Last 14 Days")}>
                      <a href="#">Last 14 Days</a>
                    </li>
                    <li onClick={() => handleDateRangeSelect("Last 30 Days")}>
                      <a href="#">Last 30 Days</a>
                    </li>
                    <li onClick={() => handleDateRangeSelect("Last 90 Days")}>
                      <a href="#">Last 90 Days</a>
                    </li>
                    <li onClick={() => handleDateRangeSelect("Last 180 Days")}>
                      <a href="#">Last 180 Days</a>
                    </li>
                    <li onClick={() => handleDateRangeSelect("Last 365 Days")}>
                      <a href="#">Last 365 Days</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h4>Crecientech</h4>
              <div className="chart-info">
                <span>Total: </span>
                <span>Visitors: 0</span>
                <span style={{ color: "green" }}>Thumbs up: 0</span>
                <span style={{ color: "red" }}>Thumbs down: 0</span>
                <span>Bot messages: 0</span>
              </div>
            </div>
            <div className="chart">
              <img src={chartImage} alt="Chart" />
            </div>
          </div>
          <div className="links-container">
            <div className="links-header">
              <h4>Top Links Clicked in Date Range</h4>
              <div className="count-btn">
                <div className="caret-icons">
                  <i
                    className="fas fa-caret-up"
                    data-hover-text="Click to sort ascending"
                  ></i>
                  <i
                    className="fas fa-caret-down"
                    data-hover-text="Click to sort descending"
                  ></i>
                </div>
                <span className="count-text">Count</span>
              </div>
            </div>
            <div className="no-data">
              <i className="fas fa-box-open"></i>
              <p>No data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="danger-zone">
        <h3>
          <i className="danger-icon">⚠️</i> Danger Zone
        </h3>
        <hr />
        <div className="danger-content">
          <span>Permanently Delete Agent</span>
          <button className="delete-button" onClick={confirmDeletion}>
            Delete
          </button>
        </div>
      </div>

      {showPasswordPopup && (
        <div className="password-popup">
          <div className="password-popup-content">
            <h3>Agent Password</h3>
            <div className="password-input-container">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
              />
            </div>
            <div className="reason-input-container">
              <label>Reason for Password Verification (Optional):</label>
              <input
                type="text"
                value={reason}
                onChange={handleReasonChange}
                placeholder="Enter agent password"
              />
            </div>
            <div className="popup-buttons">
              <button onClick={handlePasswordSubmit}>Save Changes</button>
              <button onClick={handlePopupClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
