import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Icon from './icons/icon.svg';

// const API_URL = 'http://127.0.0.1:8000/chatbot';

const API_URL = 'http://127.0.0.1:8000/airesponse';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = { role: 'user', content: inputValue };
    setInputValue('');

    // Add user's message to the state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}`, {
        message: newMessage.content,
      });

      const botReply = { role: 'bot', content: response.data.message };

      // Add bot's reply to the state
      setMessages((prevMessages) => [...prevMessages, botReply]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
            <pre className="message-content">{message.content}</pre>
          </div>
        ))}
        {loading && <div className="message bot typing-indicator"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>}
        <div ref={endOfMessagesRef} />
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
