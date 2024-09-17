from pathlib import Path
from voicevox_core import VoicevoxCore, METAS
import pyaudio
from io import BytesIO
import wave


class Voice_Vox():
    def __init__(self) -> None:
        self.core = VoicevoxCore(open_jtalk_dict_dir=Path("voicevox_core/open_jtalk_dic_utf_8-1.11"))
        self.speaker_id = 1
        self.core.load_model(self.speaker_id)
        self.audio = pyaudio.PyAudio()
        print('initialized')

    def speak(self, text):
        wave_bytes = self.core.tts(text, self.speaker_id)
        wave_io = BytesIO(wave_bytes)
        wave_obj = wave.open(wave_io, 'rb')

        stream = self.audio.open(
            format=self.audio.get_format_from_width(wave_obj.getsampwidth()),
            channels=wave_obj.getnchannels(),
            rate=wave_obj.getframerate(),
            output=True
        )

        data = wave_obj.readframes(1024)
        while data:
            stream.write(data)
            data = wave_obj.readframes(1024)

        stream.stop_stream()
        stream.close()

        self.audio.terminate()

