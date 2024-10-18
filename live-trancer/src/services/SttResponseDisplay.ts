import { ChatMessageProps } from "@/types/type";

interface ProcessSttResponseProps {
  socket: any;
  setTranscription: (text: string) => void;
  setChatLog: (
    callback: (prevLog: ChatMessageProps[]) => ChatMessageProps[]
  ) => void;
}

interface RenderSttResponseProps {
  data: any;
  setTranscription: (text: string) => void;
  setChatLog: (
    callback: (prevLog: ChatMessageProps[]) => ChatMessageProps[]
  ) => void;
}

export class SttResponseDisplay {
  SENDER: string = "AI";
  MESSAGE: string = "";

  public processSttResponse(props: ProcessSttResponseProps) {
    const { socket, setTranscription, setChatLog } = props;

    socket.on("stt_response", (data: any) =>
      this._renderSttResponse({
        data,
        setTranscription,
        setChatLog,
      })
    );
  }

  private _renderSttResponse(props: RenderSttResponseProps) {
    const { data, setTranscription, setChatLog } = props;
    if (data.text) {
      this.MESSAGE = data.text;

      setTranscription(this.MESSAGE);
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: this.SENDER, message: this.MESSAGE },
      ]);
    } else if (data.error) {
      console.error("Error:", data.error);
    }
  }
}
