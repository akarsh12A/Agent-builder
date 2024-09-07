import React, { useState } from "react";
import "./Conversations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSync,
  faCalendarAlt,
  faArrowRight,
  faTrashAlt,
  faArchive,
  faChevronDown,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

class Conversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      showModal: false,
      selectedChannel: "All Channels",
      selectedConvo: "All Convos",
      selectedSort: "Sort by",
      channelDropdownOpen: false,
      convoDropdownOpen: false,
      sortDropdownOpen: false,
    };
  }

  handleDateChange = (field, date) => {
    this.setState({ [field]: date });
  };

  handleDropdownChange = (field, value) => {
    this.setState({ [field]: value, [`${field}DropdownOpen`]: false });
  };

  toggleDropdown = (dropdown) => {
    this.setState((prevState) => ({
      [`${dropdown}DropdownOpen`]: !prevState[`${dropdown}DropdownOpen`],
    }));
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const channels = [
      "All Channels",
      "Facebook",
      "Messenger",
      "WhatsApp",
      "Instagram",
      "Widget",
      "AI Nav",
    ];
    const convos = ["All Convos", "Escalations", "Archive"];
    const sortOptions = [
      { label: "Sort by", icon: null },
      { label: "", icon: faThumbsUp },
      { label: "", icon: faThumbsDown },
    ];

    return (
      <div className="conversations-container">
        {/* Conversations Section */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h2>Conversations</h2>
            <div className="actions">
              <button className="refresh-btn" title="Refresh Conversations">
                <FontAwesomeIcon icon={faSync} className="action-icon" />
              </button>
              <button
                className="export-btn"
                onClick={this.toggleModal}
                title="Export Conversations"
              >
                <span style={{ marginLeft: "8px" }}>Export</span>
              </button>
            </div>
          </div>

          <div className="date-picker">
            <DatePicker
              selected={this.state.startDate}
              onChange={(date) => this.handleDateChange("startDate", date)}
              placeholderText="Start date"
              todayButton="Today"
              isClearable
            />
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
            <DatePicker
              selected={this.state.endDate}
              onChange={(date) => this.handleDateChange("endDate", date)}
              placeholderText="End date"
              todayButton="Today"
              isClearable
            />
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
          </div>

          <div className="dropdown-section">
            {/* Channel Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => this.toggleDropdown("channel")}
              >
                {this.state.selectedChannel}{" "}
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <ul
                className={`dropdown-menu ${
                  this.state.channelDropdownOpen ? "show" : ""
                }`}
              >
                {channels.map((channel) => (
                  <li
                    key={channel}
                    onClick={() =>
                      this.handleDropdownChange("selectedChannel", channel)
                    }
                    className={
                      this.state.selectedChannel === channel ? "selected" : ""
                    }
                  >
                    {channel}
                  </li>
                ))}
              </ul>
            </div>

            {/* Convo Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => this.toggleDropdown("convo")}
              >
                {this.state.selectedConvo}{" "}
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <ul
                className={`dropdown-menu ${
                  this.state.convoDropdownOpen ? "show" : ""
                }`}
              >
                {convos.map((convo) => (
                  <li
                    key={convo}
                    onClick={() =>
                      this.handleDropdownChange("selectedConvo", convo)
                    }
                    className={
                      this.state.selectedConvo === convo ? "selected" : ""
                    }
                  >
                    {convo}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => this.toggleDropdown("sort")}
              >
                {this.state.selectedSort}{" "}
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <ul
                className={`dropdown-menu ${
                  this.state.sortDropdownOpen ? "show" : ""
                }`}
              >
                {sortOptions.map((sort) => (
                  <li
                    key={sort.label}
                    onClick={() =>
                      this.handleDropdownChange("selectedSort", sort.label)
                    }
                    className={
                      this.state.selectedSort === sort.label ? "selected" : ""
                    }
                  >
                    {sort.icon && (
                      <FontAwesomeIcon icon={sort.icon} className="sort-icon" />
                    )}
                    {sort.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="empty-box"></div>
        </div>

        {/* Visitor Section */}
        <div className="visitor-section">
          <div className="visitor-header">
            <div className="visitor-info">
              <div className="visitor-icon">V</div>
              <div>
                <h3 style={{ margin: 0 }}>Visitor</h3>
                <p style={{ margin: 0, color: "#6c757d" }}>
                  Last active: Today
                </p>
              </div>
            </div>
            <div className="visitor-actions">
              <span className="switch-label">AI Agent</span>
              <label className="switch" title="On/Off">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <button className="archive-btn" title="Archive">
                <FontAwesomeIcon icon={faArchive} />
              </button>
              <button className="delete-btn" title="Delete">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Export Confirmation */}
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Export Confirmation"
          className="modal"
          overlayClassName="overlay"
        >
          <h3>Disconnect</h3>
          <p>Are you sure you want to export? This may take a long time.</p>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={this.toggleModal}>
              Cancel
            </button>
            <button className="download-btn">Download</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Conversations;
