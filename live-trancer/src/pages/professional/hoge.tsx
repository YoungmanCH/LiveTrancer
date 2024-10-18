
useEffect(() => {
  const socketConnection = io(SOCKET_URL);
  setSocket(socketConnection);

  socketConnection.on("connect", () =>
    _confirmSocketConnection(socketConnection.id)
  );
  socketConnection.on("stt_response", _processSttResponse);

  return () => {
    socketConnection.disconnect();
    _closeAudioContext(audioContext);
  };
}, []);

const _confirmSocketConnection = (id: string | undefined) => {
  console.log("Socket connected:", id);
};

const _processSttResponse = (data: any) => {
  if (data.text) {
    const sender: string = "AI";
    const message = data.text;

    setTranscription(message);
    setChatLog((prevLog) => [
      ...prevLog,
      { sender: sender, message: message },
    ]);
  } else if (data.error) {
    console.error("Error:", data.error);
  }
};

const _closeAudioContext = async (audioContext: AudioContext | null) => {
  if (audioContext && audioContext.state !== "closed") {
    try {
      await audioContext.close();
      console.log("AudioContext closed successfully");
    } catch (error) {
      console.error("Error closing AudioContext:", error);
    }
  }
};