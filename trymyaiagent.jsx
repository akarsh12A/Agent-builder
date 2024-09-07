import React, { useState } from 'react';
import './trymyaiagent.css';

const MyChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatVisible, setChatVisible] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      const botMessage = { text: `You said: ${input}`, sender: "bot" };

      setMessages([...messages, userMessage, botMessage]);
      setInput("");

      if (!chatVisible) {
        setChatVisible(true);
      }
    }
  };

  const handleCloseAI = () => {
    setMessages([]); // Clear all messages
    setChatVisible(false); // Optionally hide the chat box
  };

  return (
    <div className={`custom-chat-container ${chatVisible ? "custom-active" : ""}`}>
      <div className="custom-chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`custom-message ${message.sender === "user" ? "custom-user-message" : "custom-bot-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="custom-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Agent..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      const botMessage = { text: `You said: ${input}`, sender: "bot" };

      setMessages([...messages, userMessage, botMessage]);
      setInput("");
    }
  };

  const handleCloseAI = () => {
    setMessages([]); // Clear all messages
  };

  return (
    <div className="unique-chat-container">
      <div className="unique-chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`unique-message ${message.sender === "user" ? "unique-user-message" : "unique-bot-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="unique-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedTab, setSelectedTab] = useState("ainav");

  const handleTabClick = (tab) => {
    if (tab === "widget") {
      setSelectedTab("widget");
    } else {
      setSelectedTab("ainav");
    }
  };

  return (
    <div className="main-content">
      <div className="main-header">
        <header className="main-header-content">
          <h1>Try My AI Agent</h1>
          <div className="main-tabs">
            <button
              className={`main-tab ${selectedTab === "ainav" ? "main-selected" : ""}`}
              onClick={() => handleTabClick("ainav")}
            >
              AI Nav
            </button>
            <button
              className={`main-tab ${selectedTab === "widget" ? "main-selected" : ""}`}
              onClick={() => handleTabClick("widget")}
            >
              Widget
            </button>
          </div>
        </header>
      </div>
      <div className="maincontainer">
        <h1>🔆 Insights</h1>
        <div className="main-insights">
          <p>Amazon is trained on <strong>8</strong> file(s) and website(s): <strong>8</strong> have been trained, and <strong>0</strong> are untrained. <a href="#">Add more sources</a> to increase your agent's knowledge.</p>
          <p>Amazon is on the <strong>FREE PLAN: 0</strong> out of <strong>200</strong> messages have been used. <a href="#">Upgrade your plan</a> to get more message credits.</p>
          <p>Gather information from your visitors? Try <a href="#">Lead Capture</a></p>
          <button className="main-restart-button">Restart AI Nav</button>
        </div>
      </div>

      <div className="main-faq">
        <div className="main-faq-item">
          <details>
            <summary>What if I'm not happy with the agent's answer?</summary>
            <p>Provide a more specific answer or contact support.</p>
          </details>
        </div>
        <div className="main-faq-item">
          <details>
            <summary>What is the difference between "Training Materials" and "Agent Skills"?</summary>
            <p>Training materials are...</p>
          </details>
        </div>
        <div className="main-faq-item">
          <details>
            <summary>Where can I change the agent's look?</summary>
            <p>You can change it in the settings.</p>
          </details>
        </div>
        <div className="main-faq-item">
          <details>
            <summary>Where can I see how my agent responds to visitors?</summary>
            <p>Check the reports section.</p>
          </details>
        </div>
      </div>

      {/* Show MyChatbot if "AI Nav" is selected */}
      {selectedTab === "ainav" && <MyChatbot />}
      
      {/* Show Chatbot if "Widget" is selected */}
      {selectedTab === "widget" && <Chatbot />}
    </div>
  );
};

export default App;
