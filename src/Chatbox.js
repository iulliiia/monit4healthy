import React, { useState } from "react";
import "./chatbox.css";

export default function ChatBox({ patients }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "doctor", text: newMessage }]);
      setNewMessage("");
    }
  };

  const handleBackToPatientList = () => {
    setSelectedPatient(null);
    setMessages([]);
  };

  return (
    <div className={`chatbox ${isOpen ? "open" : ""}`}>
      <div className="chatbox-icon" onClick={toggleChatBox}>
        💬
      </div>
      {isOpen && (
        <div className="chatbox-content">
          <div className="chatbox-header">
            {selectedPatient ? (
              <>
                <button
                  onClick={handleBackToPatientList}
                  className="back-button"
                >
                  &larr;
                </button>
                <h3>Chat with {selectedPatient}</h3>
              </>
            ) : (
              <h3>Select a Patient</h3>
            )}
            <button onClick={toggleChatBox} className="close-button">
              &times;
            </button>
          </div>
          {!selectedPatient && (
            <div className="patient-list">
              {patients.map((patient, index) => (
                <div
                  key={index}
                  className="patient-name"
                  onClick={() => selectPatient(patient)}
                >
                  {patient}
                </div>
              ))}
            </div>
          )}
          {selectedPatient && (
            <div className="chatbox-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          )}
          {selectedPatient && (
            <div className="chatbox-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
