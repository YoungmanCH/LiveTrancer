from voicevox_core import METAS
from pprint import pprint
pprint(METAS)

from pathlib import Path
from voicevox_core import VoicevoxCore, METAS
import sys, os

core = VoicevoxCore(open_jtalk_dict_dir=Path("./open_jtalk_dic_utf_8-1.11"))
speaker_id = 2

text = sys.argv[1]
if not core.is_model_loaded(speaker_id):
    core.load_model(speaker_id)
wave_bytes = core.tts(text, speaker_id)
with open("./" + text + ".wav", "wb") as f:
    f.write(wave_bytes)