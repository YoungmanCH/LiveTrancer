import voicevox
import time


voice = voicevox.Speaker()
voice.start_speaking()
voice.add_text("どうもこんにちは、僕ずんだもん")
# voice.add_text("明日は明日、明後日は明後日")
# voice.add_text("Hello, how are you?")

time.sleep(20)
voice.finish_speaking()
# voice.speak("こんにちは。ぼくずんだもん！")
# voice.speak("こんばんは。ぼくずんだもん！")


