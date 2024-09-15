import type { AppProps } from 'next/app';
import { useState } from 'react';
import GlobalLayout from './components/templates/GlobalLayout';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isMildTranslation, setIsMildTranslation] = useState(true);
  return (
    <GlobalLayout
      isRecording={isRecording} 
      setIsRecording={setIsRecording}
      isMildTranslation={isMildTranslation}
      setIsMildTranslation={setIsMildTranslation}
    >
      <Component 
        {...pageProps} 
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isMildTranslation={isMildTranslation}
        setIsMildTranslation={setIsMildTranslation}
      />
    </GlobalLayout>
  );
}

export default App;
