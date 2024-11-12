```
live-trancer
├── src
│   ├── hooks
│   │   └── useSocketHandler.ts
│   ├── images
│   │   └── index.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── about
│   │   │   ├── about.module.css
│   │   │   └── index.tsx
│   │   ├── api
│   │   │   └── run-python.ts
│   │   ├── apis
│   │   │   ├── apis.module.css
│   │   │   └── index.tsx
│   │   ├── components
│   │   │   ├── atoms
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Image.tsx
│   │   │   │   ├── InputField.tsx
│   │   │   │   └── InputTextArea.tsx
│   │   │   ├── molecules
│   │   │   │   ├── Card.module.css
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── ContactForm.module.css
│   │   │   │   └── ContactForm.tsx
│   │   │   ├── organisms
│   │   │   │   ├── Header.module.css
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Home
│   │   │   │       ├── AbstractSection
│   │   │   │       │   ├── AbstractSection.module.css
│   │   │   │       │   └── AbstractSection.tsx
│   │   │   │       ├── ApiSection
│   │   │   │       │   ├── ApiSection.module.css
│   │   │   │       │   └── ApiSection.tsx
│   │   │   │       ├── ContactSection
│   │   │   │       │   ├── ContactSection.module.css
│   │   │   │       │   └── ContactSection.tsx
│   │   │   │       ├── SampleSection
│   │   │   │       │   ├── CardList.module.css
│   │   │   │       │   ├── CardList.tsx
│   │   │   │       │   ├── SampleSection.module.css
│   │   │   │       │   └── SampleSection.tsx
│   │   │   │       ├── StsSection
│   │   │   │       │   ├── StsSection.module.css
│   │   │   │       │   └── StsSection.tsx
│   │   │   │       ├── SttSection
│   │   │   │       │   ├── SttSection.module.css
│   │   │   │       │   └── SttSection.tsx
│   │   │   │       ├── TopSection
│   │   │   │       │   ├── TopSection.module.css
│   │   │   │       │   └── TopSection.tsx
│   │   │   │       ├── TransformTextSection
│   │   │   │       │   ├── TransformTextSection.module.css
│   │   │   │       │   └── TransformTextSection.tsx
│   │   │   │       ├── TtsSection
│   │   │   │       │   ├── TtsSection.module.css
│   │   │   │       │   └── TtsSection.tsx
│   │   │   │       └── UseCasesSection
│   │   │   │           ├── UseCasesSection.module.css
│   │   │   │           └── UseCasesSection.tsx
│   │   │   └── templates
│   │   │       └── HomeLayout.tsx
│   │   ├── home
│   │   │   ├── home.module.css
│   │   │   └── index.tsx
│   │   ├── index.tsx
│   │   ├── mode-selection
│   │   │   ├── index.tsx
│   │   │   └── modeSelection.module.css
│   │   ├── news
│   │   │   ├── index.tsx
│   │   │   └── news.module.css
│   │   └── trial
│   │       ├── index.tsx
│   │       └── trial.module.css
│   ├── services
│   │   ├── audioProcessing.ts
│   │   ├── audioToStartStsStreamer.ts
│   │   ├── audioToStopStsStreamer.ts
│   │   ├── recordingProcessor.ts
│   │   ├── recordingProcessorHelper.ts
│   │   ├── recordingStartProcessor.ts
│   │   ├── recordingStopProcessor.ts
│   │   ├── socketConnection.ts
│   │   ├── stsTrialClientLimiter.ts
│   │   ├── sttResponseDisplay.ts
│   │   └── userMediaStream.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   └── type.ts
│   └── utils
│       └── utils.ts
└── tests
    └── unlimitedAudioToStartStsStreamer.ts



```


```
microservices
├── Dockerfile
├── api
│   ├── __pycache__
│   │   └── main.cpython-312.pyc
│   ├── main.py
│   ├── node_modules
│   │   ├── @socket.io
│   │   └── flask
│   │       ├── bower.json
│   │       ├── changelog.md
│   │       ├── package.json
│   │       ├── readme.md
│   │       └── sass
│   │           ├── _flask.scss
│   │           ├── core
│   │           │   ├── _core.scss
│   │           │   └── debug
│   │           │       └── _flask-error.function.scss
│   │           ├── font
│   │           │   ├── _font-fallback.function.scss
│   │           │   ├── _font-family-key.function.scss
│   │           │   ├── _font-family.function.scss
│   │           │   ├── _font-family.mixin.scss
│   │           │   ├── _font-feature-settings.mixin.scss
│   │           │   ├── _font-modifiers.mixin.scss
│   │           │   ├── _font-name.function.scss
│   │           │   ├── _font-stack.function.scss
│   │           │   ├── _font-type.function.scss
│   │           │   ├── _font.mixin.scss
│   │           │   └── _font.scss
│   │           └── palette
│   │               ├── _palette-color-key.function.scss
│   │               ├── _palette.function.scss
│   │               └── _palette.scss
│   ├── package-lock.json
│   └── package.json
├── chatgpt_service
│   ├── Dockerfile
│   ├── requirements.txt
│   └── src
│       ├── __pycache__
│       │   └── text_to_chatgpt.cpython-312.pyc
│       ├── prompts
│       │   ├── __pycache__
│       │   │   └── prompts_text.cpython-312.pyc
│       │   └── prompts_text.py
│       └── text_to_chatgpt.py
├── integration
│   ├── __pycache__
│   │   └── __init__.cpython-312.pyc
│   ├── audio-processing
│   │   └── src
│   │       ├── __pycache__
│   │       │   └── voicevox.cpython-312.pyc
│   │       └── voicevox.py
│   └── transcription
│       ├── __pycache__
│       │   └── __init__.cpython-312.pyc
│       ├── src
│       │   ├── __pycache__
│       │   │   ├── __init__.cpython-312.pyc
│       │   │   ├── stt_to_tranc.cpython-312.pyc
│       │   │   ├── stt_to_tranc_to_tts.cpython-312.pyc
│       │   │   └── test_stt_to_wav.cpython-312.pyc
│       │   ├── mic_stt_to_tranc.py
│       │   ├── mic_stt_to_tranc_to_tts.py
│       │   ├── stt.py
│       │   ├── stt_to_tranc.py
│       │   └── stt_to_tranc_to_tts.py
│       └── test
│           ├── __pycache__
│           │   ├── test_stt.cpython-312.pyc
│           │   ├── test_stt_to_seconds10.cpython-312.pyc
│           │   └── test_stt_to_wav.cpython-312.pyc
│           ├── test_stt.py
│           ├── test_stt_to_seconds10.py
│           └── test_stt_to_wav.py
├── ip_limiter
│   ├── postgres_sql
│   │   ├── __pycache__
│   │   │   └── ip_requests.cpython-312.pyc
│   │   └── ip_requests.py
│   └── src
│       ├── __pycache__
│       │   ├── ip_handler.cpython-312.pyc
│       │   ├── rds.cpython-312.pyc
│       │   └── rds_handler.cpython-312.pyc
│       ├── ip_handler.py
│       └── rds_handler.py
├── sts
│   ├── Dockerfile
│   ├── requirements.txt
│   └── src
│       ├── __pycache__
│       │   ├── sts.cpython-312.pyc
│       │   └── stt_to_chatgpt_to_tts.cpython-312.pyc
│       ├── sts.py
│       └── stt_to_chatgpt_to_tts.py
├── stt
│   ├── Dockerfile
│   ├── requirements.txt
│   └── src
│       ├── __pycache__
│       │   ├── google_stt.cpython-312.pyc
│       │   ├── stt.cpython-312.pyc
│       │   └── stt_to_chatgpt.cpython-312.pyc
│       ├── google_stt.py
│       ├── stt.py
│       └── stt_to_chatgpt.py
├── tests
│   ├── __pycache__
│   │   └── save_audio.cpython-312.pyc
│   ├── test_stt.py
│   └── test_stt_to_seconds10.py
├── tts
│   ├── Dockerfile
│   ├── requirements.txt
│   └── src
│       ├── __pycache__
│       │   ├── google_tts.cpython-312.pyc
│       │   └── tts.cpython-312.pyc
│       ├── google_tts.py
│       └── tts.py
└── utils
    ├── __pycache__
    │   ├── audio_file_saver.cpython-312.pyc
    │   ├── save_audio.cpython-312.pyc
    │   └── save_tts_audio.cpython-312.pyc
    ├── audio_file_saver.py
    ├── save_audio.py
    ├── save_tts_audio.py
    └── write_binary.py
```