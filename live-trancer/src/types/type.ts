export interface ChatMessageProps {
  sender: string;
  message: string | null;
}

export interface DownsampleBufferProps {
  buffer: Float32Array;
  sampleRate: number;
}
