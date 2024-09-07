import React, { useState } from 'react';
import './advanced.css';


const AdvancedSettings = () => {
  const [basePrompt, setBasePrompt] = useState('');
  const [emails, setEmails] = useState(['']);
  const [agentModel, setAgentModel] = useState('Standard Model (Llama-3.1 405B)');
  const [agentName, setAgentName] = useState('Agent');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [showEmailUpdateNotification, setShowEmailUpdateNotification] = useState(false);
  const [showAgentUpdateNotification, setShowAgentUpdateNotification] = useState(false);
  const [showUpgradeNotification, setShowUpgradeNotification] = useState(false);

  const handleAddEmail = () => {
    if (emails.length < 4) {
      setEmails([...emails, '']);
    }
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleSaveChanges = () => {
    console.log('Changes Saved:', { basePrompt, emails, agentModel, agentName });

    setShowEmailUpdateNotification(true);
    setShowAgentUpdateNotification(true);
    setTimeout(() => {
      setShowEmailUpdateNotification(false);
      setShowAgentUpdateNotification(false);
    }, 3000);
  };

  const handleResetToDefault = () => {
    setBasePrompt('');
    setEmails(['']);
    setAgentModel('Standard Model (Llama-3.1 405B)');
    setAgentName('Agent');
  };

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    if (selectedModel !== 'Standard Model (Llama-3.1 405B)') {
      setShowUpgradeNotification(true);
      setAgentModel('Standard Model (Llama-3.1 405B)');
      setTimeout(() => {
        setShowUpgradeNotification(false);
      }, 3000);
    } else {
      setAgentModel(selectedModel);
    }
  };

  return (
    <div className="advanced-settings-container">
      <h2 className="advanced-settings-heading">Advanced Settings</h2>
      <div className="advanced-settings">
        <div
          className="form-group"
          onMouseEnter={() => setShowSuggestions(true)}
          onMouseLeave={() => setShowSuggestions(false)}
        >
          <label>Change Base Prompt:</label>
          <textarea
            placeholder="This is a place where you can add an additional custom base prompt for your agent. This section is optional."
            value={basePrompt}
            onChange={(e) => setBasePrompt(e.target.value)}
            maxLength="2500"
          />
          {showSuggestions && (
            <div className="suggestions-box">
              <div className="suggestions-header">
                <h4 style={{ marginRight: '5px', marginBottom: '10px' }}>Would you like some suggestions?</h4>
                <button onClick={() => setShowSuggestions(false)}>X</button>
              </div>
              <div className='suggest'><input type="text" placeholder="Agent Name (Jack, ABC Corp.)" /></div>
              <div className='suggest2'>< input type="text" placeholder="Role (Sales, Fitness Trainer)" /></div>
              <button className="suggest-button">Suggest</button>
            </div>
          )}
        </div>
        <label>Add any additional emails you wish to send agent notifications and updates to:</label>
        <div className="email">
          {emails.map((email, index) => (
            <div className="email-input-group" key={index}>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="Enter email"
              />
              {index === emails.length - 1 && emails.length < 4 && (
                <button onClick={handleAddEmail} className="add-email-button">+</button>
              )}
              {index > 0 && (
                <button onClick={() => handleRemoveEmail(index)} className="remove-email-button">-</button>
              )}
            </div>
          ))}
        </div>
        <div className="Model">
          <label>Agent Model:</label>
          <select
            value={agentModel}
            onChange={handleModelChange}
          >
            <option className='tooltip'>Standard Model (Llama-3.1 405B)</option>
            <option className='tooltip2'>Advanced Model (GPT-4o)</option>
            <option>GPT-4o-Mini</option>
            <option>GPT-4 Turbo(Llama-3.1 405B)</option>
          </select>
        </div>
        <div className="agent">
          <label>Agent Name:</label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Agent"
          />
        </div>
        <div className="form-actions">
          <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
          <button onClick={handleResetToDefault} className="reset-button">Reset to Default</button>
        </div>
      </div>

      {showEmailUpdateNotification && (
        <div className="notification email-notification">
          <img src={check} alt="check" />
          Emails updated successfully
        </div>
      )}
      {showAgentUpdateNotification && (
        <div className="notification agent-notification">
          <img src={check} alt="check" />
          Agent updated successfully
        </div>
      )}
      {showUpgradeNotification && (
        <div className="notification upgrade-notification">
          <img src={wrong} alt="Warning" />
          You need to upgrade your plan to use the advanced model.
        </div>
      )}
    </div>
    
  );
};

export default AdvancedSettings;

