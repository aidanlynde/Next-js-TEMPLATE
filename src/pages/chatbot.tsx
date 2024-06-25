import { useState } from 'react';
import styles from '../styles/Chatbot.module.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! I'm your nutrition assistant. What's your name?", sender: "bot" }]);
  const [userInput, setUserInput] = useState('');

  const handleSend = () => {
    if (userInput.trim() === '') return;

    // Add user's message to the chat
    setMessages([...messages, { text: userInput, sender: "user" }]);
    setUserInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: `Nice to meet you, ${userInput}! How old are you?`, sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
