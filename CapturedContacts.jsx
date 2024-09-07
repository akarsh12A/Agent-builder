import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./CapturedContacts.css";
import Nodata from "../assets/Nodata.jpg";

const Tooltip = ({ message, top, left, show, onClick }) => {
  return ReactDOM.createPortal(
    <div
      className={`tooltip ${show ? "show" : ""}`}
      style={{ top: `${top}px`, left: `${left}px` }}
      onClick={onClick}
    >
      {message}
    </div>,
    document.body
  );
};

const CapturedContacts = () => {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [sortState, setSortState] = useState({});
  const headerRefs = useRef({});

  const handleMouseEnter = (e, key) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      key,
      message: getTooltipMessage(key),
      top: rect.top + window.scrollY - 25,
      left: rect.left + window.scrollX + rect.width / 2 - 95,
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleTooltipClick = (key) => {
    const newSortState = updateSortState(key);
    setSortState(newSortState);
    setTooltip({
      ...tooltip,
      message: getTooltipMessage(key, newSortState[key]),
    });
  };

  const getTooltipMessage = (key, state = sortState[key]) => {
    switch (state) {
      case "asc":
        return "Click to sort descending";
      case "desc":
        return "Click to cancel sorting";
      default:
        return "Click to sort ascending";
    }
  };

  const updateSortState = (key) => {
    switch (sortState[key]) {
      case "asc":
        return { ...sortState, [key]: "desc" };
      case "desc":
        return { ...sortState, [key]: "" }; // Cancel sorting
      default:
        return { ...sortState, [key]: "asc" };
    }
  };

  return (
    <div className="captured-contacts-container">
      <div className="header-container">
        <h1 className="page-heading">Captured Contacts</h1>
        <button className="export-btn">Export to CSV</button>
      </div>
      <div className="outer-container">
        <div className="table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                {["date", "name", "email", "message"].map((key) => (
                  <th
                    key={key}
                    ref={(el) => (headerRefs.current[key] = el)}
                    onMouseEnter={(e) => handleMouseEnter(e, key)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleTooltipClick(key)}
                    className={
                      sortState[key] === "asc"
                        ? "sort-asc"
                        : sortState[key] === "desc"
                        ? "sort-desc"
                        : "sort-none"
                    }
                  >
                    {capitalizeFirstLetter(key)}
                    <div className="triangle-button up"></div>
                    <div className="triangle-button down"></div>
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="no-data-row">
                <td></td>
                <td></td>
                <td colSpan="5" className="no-data">
                  <div className="no-data-icon">
                    <img src={Nodata} alt="No data" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {tooltip && (
        <Tooltip
          message={tooltip.message}
          top={tooltip.top}
          left={tooltip.left}
          show={tooltipVisible}
          onClick={() => handleTooltipClick(tooltip.key)}
        />
      )}
    </div>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default CapturedContacts;
