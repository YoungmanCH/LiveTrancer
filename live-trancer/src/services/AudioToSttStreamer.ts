import { DownsampleBufferProps } from "@/types/type";

interface AudioToSTTStreamProps {
  input: MediaStreamAudioSourceNode;
  processor: ScriptProcessorNode;
  audioContext: AudioContext;
  socket: any;
  downsampleBuffer: (props: DownsampleBufferProps) => ArrayBuffer;
}

export class AudioToSttStreamer {
  private pipelineConnector: AudioPipelineConnector;

  constructor() {
    this.pipelineConnector = new AudioPipelineConnector();
  }

  public streamAudioToStt = (props: AudioToSTTStreamProps) => {
    const { input, processor, audioContext, socket, downsampleBuffer } = props;

    this.pipelineConnector.connectAudioPipeline({
      input,
      processor,
      audioContext,
    });

    processor.onaudioprocess = (event: AudioProcessingEvent) => {
      this._handleAudioProcess(event, audioContext, downsampleBuffer, socket);
    };
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

    this._streamToSttServer(socket, downsampledBuffer);
  };

  private _streamToSttServer = (
    socket: any,
    downsampledBuffer: ArrayBuffer
  ) => {
    socket.emit("stt", downsampledBuffer);
    console.log("Audio data is streaming.");
  };
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
