import type { AppProps } from "next/app";
import { useState } from "react";
import HomeLayout from "./components/templates/HomeLayout";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const [isChoosen, setIsChoosen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMildTranslation, setIsMildTranslation] = useState(true);
  
  // 状態を pageProps に渡して、各ページから使えるようにする
  const props = {
    ...pageProps,
    isChoosen,
    setIsChoosen,
    isRecording,
    setIsRecording,
    isMildTranslation,
    setIsMildTranslation,
  };

  return (
    <HomeLayout>
      <Component {...props} />
    </HomeLayout>
  );
}

export default App;
