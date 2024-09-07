import React, { useState } from "react";
import { FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import "./UserSettings.css";

const UserSettings = () => {
  const [firstName, setFirstName] = useState("HEMANTH");
  const [lastName, setLastName] = useState("KUMAR");
  const [email, setEmail] = useState("hemanth.kumar04hh@gmail.com");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isResetPopupVisible, setIsResetPopupVisible] = useState(false);

  const handleSaveChanges = () => {
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2000);
  };

  const handleResetPassword = () => {
    setIsResetPopupVisible(true);
    setTimeout(() => {
      setIsResetPopupVisible(false);
    }, 2000);
  };

  return (
    <div className="user-settings-wrapper">
      <div className="user-settings-container">
        <h2 className="user-settings-title">User Settings</h2>
        <div className="user-details">
          <h3 className="user-name">{`${firstName} ${lastName}`}</h3>
          <form className="user-form">
            <div className="name-group">
              <div className="form-group">
                <label>
                  <span className="required">*</span> First name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label>
                  <span className="required">*</span> Last name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                <span className="required">*</span> Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="button-group">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="save-button"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="reset-button"
              >
                Reset password
              </button>
            </div>
            <hr className="divider-line" />
          </form>
          <button className="signout-button">
            <FaSignOutAlt /> Sign out
          </button>
        </div>
        {isPopupVisible && (
          <div className="popup">
            <FaCheckCircle /> User updated successfully!
          </div>
        )}
        {isResetPopupVisible && (
          <div className="popup">
            <FaCheckCircle /> Email sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
