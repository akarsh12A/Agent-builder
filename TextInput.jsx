import React, { useState } from 'react';
import './Trainingmaterials.css';

const TextInput = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const addText = () => {
    if (title.trim() && body.trim()) {
      onUpload({ title, body });  // Pass the title and body text to the parent component
      alert(`Training the text with title: ${title}`);
      setTitle('');  // Clear the inputs after submission
      setBody('');
    } else {
      alert('Please enter both title and body text.');
    }
  };

  return (
    <div className="step">
      <div className="text-input-container">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={handleTitleChange}
          className="text-input-title"
        />
        <textarea
          placeholder="Enter Main Body Text"
          value={body}
          onChange={handleBodyChange}
          className="text-input-body"
        />
        <button onClick={addText} className="fetch-button">Train on Text</button>
      </div>
    </div>
  );
};

export default TextInput;
