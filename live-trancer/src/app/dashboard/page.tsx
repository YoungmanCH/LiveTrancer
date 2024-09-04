'use client';

import { useState } from 'react';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: string; message: string }[]>([]);

  const handleSend = () => {
    if (inputText.trim()) {
      setChatLog((prevLog) => [...prevLog, { sender: 'User', message: inputText }]);
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: 'User', message: inputText },
        { sender: 'AI', message: `This is a response to: "${inputText}"` },
      ]);
      setInputText('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        {chatLog.length === 0 ? (
          <p className={styles.emptyMessage}>No messages yet. Start the conversation!</p>
        ) : (
          <div className={styles.chatLog}>
            {chatLog.map((log, index) => (
              <div key={index} className={log.sender === 'User' ? styles.userMessage : styles.aiMessage}>
                <strong>{log.sender}:</strong> {log.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send a message..."
          className={styles.textArea}
        />
        <button onClick={handleSend} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}
