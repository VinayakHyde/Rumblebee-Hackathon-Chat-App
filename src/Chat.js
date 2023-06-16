import React, { useState } from 'react';
import axios from 'axios';
import Icon from './icons/icon.svg';

const API_URL = 'http://localhost:5000'; // Your server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = { role: 'user', content: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue('');

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: newMessage.content,
      });
      const botReply = { role: 'bot', content: response.data.reply };
      setMessages([...messages, botReply]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <div className="banner">
      <img src={Icon} alt="Icon" className="icon" />
      </div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <span className="message-content">{message.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="input-box"
        />
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
  );
}

export default App;
