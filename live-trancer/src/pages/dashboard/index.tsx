'use client';

import { useState } from 'react';
import styles from './dashboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneAltSlash, faMicrophoneSlash, faRefresh } from "@fortawesome/free-solid-svg-icons";

interface ChatMessage {
  sender: string;
  message: string;
}

interface DashboardProps {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  isMildTranslation: boolean;
  setIsMildTranslation: (value: boolean) => void;
}

export default function Dashboard({
  isRecording, 
  setIsRecording,
  isMildTranslation,
  setIsMildTranslation
}: DashboardProps) {
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  // const [isRecording, setIsRecording] = useState(false);
  // const [isMildTranslation, setIsMildTranslation] = useState(true); 

  const handleSend = () => {
    if (inputText.trim()) {
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: 'User', message: inputText },
        { sender: 'AI', message: `This is a response to: "${inputText}"` },
      ]);
      setInputText('');
    }
  };

  // 録音ボタンのハンドラー
  const handleRecording = () => {
    setIsRecording(!isRecording);
    // 録音開始/停止のロジックをここに追加
    console.log(isRecording ? 'Recording stopped' : 'Recording started');
  };

  const modeSwitch = () => {
    setIsMildTranslation(!isMildTranslation);
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
        <div className={isRecording ? styles.recordBox : styles.inputBox}>
          <button onClick={modeSwitch} className={isRecording ? styles.none : styles.modeSwitch}>
            <FontAwesomeIcon
              icon={faRefresh}
              className={styles.modeSwitchIcon}
            />
          </button>
          <button onClick={handleRecording} className={styles.recordButton}>
            <FontAwesomeIcon 
              icon={faMicrophone} 
              className={styles.microphone}
            /> {/* アイコン切り替え */}
          </button>
        </div>
        {/* <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send a message..."
          className={styles.textArea}
        />
        <button onClick={handleSend} className={styles.sendButton}>Send</button> */}
      </div>
    </div>
  );
}
