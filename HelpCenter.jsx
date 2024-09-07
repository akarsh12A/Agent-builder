import React, { useState } from "react";
import "./Helpcenter.css";

const HelpCenter = ({ isSidebarCollapsed }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [reason, setReason] = useState("");
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-based index)
  const [currentYear, setCurrentYear] = useState(2024);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation message
  const [showPopup, setShowPopup] = useState(false); // New state for popup visibility
  const [personalcontainer, setpersonalcontainer] = useState(null); // New state

  const weekdays = [1, 2, 3, 4, 5]; // Monday to Friday

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();

    if (weekdays.includes(dayOfWeek)) {
      setSelectedDate(day);
      setShowPersonalDetails(true);
    } else {
      alert("Appointments can only be booked on weekdays (Monday to Friday).");
    }
  };

  const handleDetailsSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true); // Show confirmation message
    setShowPopup(true); // Show the popup
    setSelectedDate(null);
    setSelectedTime("");
    setName("");
    setEmail("");
    setShowPersonalDetails(false);
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`blank-${i}`} className="day blank"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={i}
          className={`day ${selectedDate === i ? "selected" : ""}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = () => {
    if (userMessage.trim() !== "") {
      const newMessages = [...messages, { sender: "user", text: userMessage }];
      setMessages(newMessages);
      setUserMessage("");

      setTimeout(() => {
        const botResponse = {
          sender: "bot",
          text: "This is a simulated response from the bot.",
        };
        setMessages([...newMessages, botResponse]);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const closePopup = () => {
    setShowPopup(false); // Hide the popup when OK is clicked
  };

  return (
    <div className="main-content">
      <div className={`app-container ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="help-center">
          <h1>Help Center</h1>
        </div>
        <div className="main-container">
          <p>
            Chat with us if you have any questions, feedback, or suggestions.
          </p>
          <p>
            Feel free to read our{" "}
            <a href="documentation.html">documentation here</a>.
          </p>
          <p>
            Email: <a href="mailto:info@chatsimple.ai">info@chatsimple.ai</a>
          </p>
          <p>
            Linkdin: <a href="mailto:info@chatsimple.ai">info@chatsimple.ai</a>
          </p>

          <div className="calendar-and-form">
            <div className="calendar-container">
              <div className="calendar-header">
                <span
                  className="arrow left"
                  onClick={() => handleMonthChange("prev")}
                >
                  &lt;
                </span>
                <span className="month-year">{`${
                  currentMonth + 1
                }/${currentYear}`}</span>
                <span
                  className="arrow right"
                  onClick={() => handleMonthChange("next")}
                >
                  &gt;
                </span>
              </div>
              <div className="calendar-weekdays">
                <div className="weekday">Sun</div>
                <div className="weekday">Mon</div>
                <div className="weekday">Tue</div>
                <div className="weekday">Wed</div>
                <div className="weekday">Thu</div>
                <div className="weekday">Fri</div>
                <div className="weekday">Sat</div>
              </div>
              <div className="calendar-days">{renderDays()}</div>
            </div>

            {showPersonalDetails && (
              <form
                className="personal-details-form"
                onSubmit={handleDetailsSubmit}
              >
                <div className="personal-container">
                  <h3>Enter Your Personal Details</h3>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Guests:
                    <input
                      type="text"
                      placeholder=""
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Reason For Appointment :
                    <input
                      type="text"
                      placeholder=""
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    Select Time:
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                    >
                      <option value="">Select a time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="confirm-button">
                    <button type="submit">Confirm Booking</button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Appointment Confirmation</h3>
                <p>Your appointment details have been sent to your email.</p>
                <button onClick={closePopup}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="confirmation-message">
        <h3>Appointment Details</h3>
        <p>
          <strong>Date:</strong>{" "}
          {`${currentMonth + 1}/${selectedDate}/${currentYear}`}
        </p>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Time:</strong> {selectedTime}
        </p>
        <h4>
          Kindly verify your appointment details before booking the appointment.
        </h4>
      </div>

      <div
        className={`chatbot-container ${chatVisible ? "visible" : "hidden"}`}
      >
        <div className="chat-header">
          <h3>Chatbot</h3>
          <button onClick={toggleChat} className="close-chat">
            ×
          </button>
        </div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userMessage}
            onChange={handleUserMessage}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <button className="chat-button" onClick={toggleChat}>
        <span className="chat-icon">💬</span>
      </button>
    </div>
  );
};

export default HelpCenter;
