import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Chatbot.module.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const router = useRouter();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userUid = localStorage.getItem('userUid');
    if (!userUid) {
      alert('User not authenticated');
      router.push('/login');
      return;
    }

    setMessages([...messages, { sender: 'user', message: input }]);
    setInput('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        message: input,
        user_id: userUid,
      });

      const botResponse = response.data.response;
      setMessages([...messages, { sender: 'user', message: input }, { sender: 'bot', message: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.heading}>Chatbot</h1>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;

