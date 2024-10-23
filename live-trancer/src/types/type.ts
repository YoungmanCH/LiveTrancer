export interface ChatMessageProps {
  sender: string;
  message: string | null;
}

export interface DownsampleBufferProps {
  buffer: Float32Array;
  sampleRate: number;
}

export interface AudioToStsStreamerProps {
  input: MediaStreamAudioSourceNode;
  processor: ScriptProcessorNode;
  audioContext: AudioContext;
  socket: any;
  downsampleBuffer: (props: DownsampleBufferProps) => ArrayBuffer;
}

export interface StartRecordingProps {
  setIsRecording: (value: boolean) => void;
  socket: any;
  setAudioContext: (context: AudioContext) => void;
  setProcessor: (processor: ScriptProcessorNode) => void;
}