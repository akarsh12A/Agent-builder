import React, { useState } from 'react';
import './questionans.css'; // Include your updated CSS file here

function UniqueQA() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleAdd = () => {
    setShowPopup(true);
  };

  const handleSubmit = () => {
    if (newQuestion && newAnswer) {
      setQuestions([...questions, { question: newQuestion, answer: newAnswer }]);
      setShowPopup(false);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const handleDeleteAll = () => {
    setQuestions([]);
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="unique-qa-container">
      <h1 className="unique-qa-header">Question & Answer</h1>
      <p className="unique-qa-description">
        Control how your bot responds to questions and messages. Tailor your own custom responses.
      </p>
      <div className="unique-qa-actions">
        <button className="unique-add-btn" onClick={handleAdd}>+ Add</button>
        <button className="unique-delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
        <input
          type="text"
          placeholder="Search"
          className="unique-search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="unique-qa-table">
        <thead>
          <tr>
            <th className="unique-table-header">Question</th>
            <th className="unique-table-header">Answer</th>
            <th className="unique-table-header">Actions</th>
            <th className="unique-table-header">Escalate with Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, index) => (
              <tr key={index} className="unique-table-row">
                <td className="unique-table-cell">{q.question}</td>
                <td className="unique-table-cell">{q.answer}</td>
                <td className="unique-table-cell">
                  {/* Add any action buttons here */}
                </td>
                <td className="unique-table-cell">
                  {/* Add any escalate with email functionality here */}
                </td>
              </tr>
            ))
          ) : (
            <tr className="unique-no-data-row">
              <td colSpan="4" className="unique-no-data-cell">
                <img src="path-to-your-image.png" alt="No data" className="unique-no-data-image" /> No data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showPopup && (
        <div className="unique-popup">
          <div className="unique-popup-content">
            <h2 className="unique-popup-header">Add Question & Answer</h2>
            <input
              type="text"
              placeholder="Enter Question"
              className="unique-popup-input"
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
            />
            <textarea
              placeholder="Enter Answer"
              className="unique-popup-textarea"
              value={newAnswer}
              onChange={e => setNewAnswer(e.target.value)}
            ></textarea>
            <button className="unique-submit-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UniqueQA;
