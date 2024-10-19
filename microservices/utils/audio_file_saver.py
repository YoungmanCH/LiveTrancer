import wave

class AudioFileSaver:        
    def save_original_transcription_to_file(self, transcript):
        print("解析結果を保存しています。 original_transcription.txt")
        with open("original_transcription.txt", "a", encoding="utf-8") as f:
          f.write(transcript + "\n")
        
    def save_original_audio(self, audio_data):
        channels = 1  # モノラル
        sample_width = 2  # 16ビット
        sample_rate = 16000
        filename="original_audio.wav"
        print("音声データを保存しました。 to original_audio.wav")
        
        with wave.open(filename, 'wb') as wf:
            wf.setnchannels(channels)
            wf.setsampwidth(sample_width)
            wf.setframerate(sample_rate)
            wf.writeframes(audio_data)
            
    def save_chatgpt_transcription_to_file(self, transcript):
        """ChatGPTで加工されたテキストをファイルに保存"""
        with open("chatgpt_transcription.txt", "a", encoding="utf-8") as f:
            f.write(transcript + "\n")
        print("加工されたテキストファイルを保存しています。chatgpt_transcription.txt")