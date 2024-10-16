from pathlib import Path
from voicevox_core import VoicevoxCore, METAS
import pyaudio
from io import BytesIO
import wave
import threading

class Speaker():
    def __init__(self) -> None:
        open_jtalk_dict_dir_path = "/Users/youngman/practice/LiveTrancer/open_jtalk/open_jtalk_dic_utf_8-1.11"
        self.core = VoicevoxCore(open_jtalk_dict_dir=Path(open_jtalk_dict_dir_path))
        self.speaker_id = 1
        self.core.load_model(self.speaker_id)
        self.audio = pyaudio.PyAudio()

        self.wave_stocks = []
        self.can_speak = False
        print('initialized')

    def add_text(self, text):
        wave_bytes = self.core.tts(text, self.speaker_id)
        wave_obj = wave.open(BytesIO(wave_bytes), 'rb')
        self.wave_stocks.append(wave_obj)

    def start_speaking(self):
        self.can_speak = True
        speak = threading.Thread(target=self._speak)
        speak.start()

    def finish_speaking(self):
        self.can_speak = False

    def _speak(self):
        while self.can_speak:
            for stock in self.wave_stocks:
                if not self.can_speak:
                    break
                stream = self.audio.open(
                    format=self.audio.get_format_from_width(stock.getsampwidth()),
                    channels=stock.getnchannels(),
                    rate=stock.getframerate(),
                    output=True
                )

                data = stock.readframes(1024)
                while data:
                    stream.write(data)
                    data = stock.readframes(1024)

                stream.stop_stream()
                stream.close()

                self.audio.terminate()
                self.wave_stocks.remove(stock)