import type { AppProps } from "next/app";
import { useState } from "react";
import HomeLayout from "./components/templates/HomeLayout";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const [isChoosen, setIsChoosen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMildTranslation, setIsMildTranslation] = useState(true);
  
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  );
}

export default App;
