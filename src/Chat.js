import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Icon from './icons/icon.svg';

// const API_URL = 'http://127.0.0.1:8000/chatbot';

const API_URL = 'http://127.0.0.1:8000/airesponse';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: `
      👋 Hi! I am HiverChat, ask me anything about Hiver for an instant response!
      In case you want to speak to a customer agent? <span style="color: blue; text-decoration: underline; cursor: pointer;">Click here</span>.
      It might take us 15-20 min to respond back.
      For instant response, use the chat below.`
    }
  ]);
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
    setMessages((messages) => [...messages, newMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}`, {
        message: newMessage.content,
      });

      const botReply = { role: 'bot', content: response.data.message };
      setMessages((messages) => {
        const updatedMessages = [...messages, botReply];
        setLoading(false);
        return updatedMessages;
      });
    } catch (error) {
      setLoading(false);
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
            <pre className="message-content" dangerouslySetInnerHTML={{ __html: message.content }} />
          </div>
        ))}
        {loading && ( // Render the loading animation
          <div className="message bot">
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
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
