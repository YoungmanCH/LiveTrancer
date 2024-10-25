import { DownsampleBufferProps, AudioToStsStreamerProps } from "@/types/type";

export class AudioToStsStreamer {
  private pipelineConnector: AudioPipelineConnector;

  constructor() {
    this.pipelineConnector = new AudioPipelineConnector();
  }

  public startStreamingAudioToSts = (props: AudioToStsStreamerProps) => {
    const { input, processor, audioContext, socket, downsampleBuffer } = props;

    this.pipelineConnector.connectAudioPipeline({
      input,
      processor,
      audioContext,
    });

    processor.onaudioprocess = (event: AudioProcessingEvent) => {
      this._handleStartAudioProcess(
        event,
        audioContext,
        downsampleBuffer,
        socket
      );
    };

    this._postQueryDB(socket);
    this._getQueryDBLimit(socket);
  };

  public stopStreamingAudioToSts(socket: any) {
    socket.emit("stop_recording");
    socket.on("stop_recording", (audioBuffer: any) =>
      this._downloadAudioToSts(audioBuffer)
    );
  }

  private _handleStartAudioProcess = (
    event: AudioProcessingEvent,
    audioContext: AudioContext,
    downsampleBuffer: (props: DownsampleBufferProps) => ArrayBuffer,
    socket: any
  ) => {
    const inputBuffer = event.inputBuffer.getChannelData(0);
    const downsampledBuffer = downsampleBuffer({
      buffer: inputBuffer,
      sampleRate: audioContext.sampleRate,
    });

    this._postAudioToStsServer(socket, downsampledBuffer);
  };

  private _postAudioToStsServer = (
    socket: any,
    downsampledBuffer: ArrayBuffer
  ) => {
    socket.emit("sts", downsampledBuffer);
    console.log("Audio data is streaming.");
  };

  private _postQueryDB(socket: any) {
    socket.emit("query_db");
    console.log("クエリを実行中")
  }

  private _getQueryDBLimit(socket: any) {
    socket.on('query_db_response', (data: any) => {
      if (data.error) {
          console.log('ERROR:', data.error);
      } else {
        console.log('本日の残り回数:', data.count);
      }
  });
  }

  private _downloadAudioToSts(audioBuffer: any) {
    if (audioBuffer && audioBuffer.byteLength > 0) {
      const blob = new Blob([audioBuffer], { type: "audio/wav" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sample_sts_audio.wav";
      document.body.appendChild(link);
      link.click();
      console.log("Downloaded STS Audio.");
    } else {
      console.error("Received empty or invalid audio buffer.");
    }
  }
}

interface ConnectAudioPipelineProps {
  input: MediaStreamAudioSourceNode;
  processor: ScriptProcessorNode;
  audioContext: AudioContext;
}

class AudioPipelineConnector {
  public connectAudioPipeline = (props: ConnectAudioPipelineProps) => {
    const { input, processor, audioContext } = props;
    input.connect(processor);
    processor.connect(audioContext.destination);
  };
}
