import { useEffect } from "react";
import { SocketConnection } from "../services/socketConnection";
import { SttResponseDisplay } from "../services/sttResponseDisplay";
import { ChatMessageProps } from "../types/type";

interface UseSocketHandlerProps {
  SOCKET_URL: string;
  setSocket: (socket: any) => void;
  setTranscription: (text: string) => void;
  setChatLog: (
    callback: (prevLog: ChatMessageProps[]) => ChatMessageProps[]
  ) => void;
  audioContext: AudioContext | null;
}

export const useSocketHandler = ({
  SOCKET_URL,
  setSocket,
  setTranscription,
  setChatLog,
  audioContext,
}: UseSocketHandlerProps) => {
  useEffect(() => {
    const socketConnection = new SocketConnection(SOCKET_URL);
    const initializedSocket = _handleInitializeSocket(socketConnection);
    // _handleProcessSttResponse(initializedSocket);

    return () => {
      _handleCleanupSocket(socketConnection);
    };
  }, []);

  const _handleInitializeSocket = (socketConnection: SocketConnection): any => {
    return socketConnection.initializeSocket({ setSocket });
  };

  const _handleProcessSttResponse = (socket: any) => {
    const sttResponseDisplay = new SttResponseDisplay();
    sttResponseDisplay.processSttResponse({
      socket,
      setTranscription,
      setChatLog,
    });
  };

  const _handleCleanupSocket = (SocketConnection: SocketConnection) => {
    SocketConnection.cleanupSocket(audioContext);
  };
};
