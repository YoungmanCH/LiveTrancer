import { DownsampleBufferProps, AudioToStsStreamerProps } from "@/types/type";
import { StsTrialClientLimiter } from "./stsTrialClientLimiter";

export class AudioToStartStsStreamer {
  private pipelineConnector: AudioPipelineConnector;

  constructor() {
    this.pipelineConnector = new AudioPipelineConnector();
  }

  public startStreamingAudioToSts = async (props: AudioToStsStreamerProps) => {
    const { input, processor, audioContext, socket, downsampleBuffer } = props;

    if (!this._checkStartRecording()) {
      console.log("本日のリクエスト上限に達しています");
      return;
    }

    this.pipelineConnector.connectAudioPipeline({
      input,
      processor,
      audioContext,
    });

    this._postQueryDB(socket);
    const response_limit = await this._getQueryDBLimit(socket);

    if (!response_limit) {
      processor.onaudioprocess = (event: AudioProcessingEvent) => {
        this._handleAudioProcess(event, audioContext, downsampleBuffer, socket);
      };
    }
  };

  private _handleAudioProcess = (
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
    console.log("クエリを実行中");
  }

  private _getQueryDBLimit(socket: any): Promise<boolean> {
    return new Promise((resolve) => {
      socket.on("query_db_response", (data: any) => {
        if (data.error) {
          console.log("失敗:", data.error);
          resolve(false);
        } else {
          console.log("本日の残り回数:", data.count);
          resolve(true);
        }
      });
    });
  }

  private _checkStartRecording(): boolean {
    return StsTrialClientLimiter.checkStartRecording();
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
