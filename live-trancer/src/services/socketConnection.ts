import io from "socket.io-client";

interface InitializationSocketProps {
  setSocket: (socket: any) => void;
}

export class SocketConnection {
  private socket: any;

  constructor(SOCKET_URL: string) {
    this.socket = io(SOCKET_URL);
  }

  public initializeSocket(props: InitializationSocketProps): any {
    const { setSocket } = props;
    setSocket(this.socket);
    this.socket.on("connect", this._confirmSocketConnection);
    return this.socket;
  }

  private _confirmSocketConnection = () => {
    console.log("Socket connected:", this.socket.id);
  };

  public cleanupSocket = (audioContext: AudioContext | null) => {
    this.socket.disconnect();
    this._closeAudioContext(audioContext);
  };

  private _closeAudioContext = async (audioContext: AudioContext | null) => {
    if (audioContext && audioContext.state !== "closed") {
      try {
        await audioContext.close();
        console.log("AudioContext closed successfully");
      } catch (error) {
        console.error("Error closing AudioContext:", error);
      }
    }
  };
}
