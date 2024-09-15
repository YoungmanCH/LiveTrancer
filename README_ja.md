<h1 align="center">LiveTrancer</h1>

## 公式サイト:
<a href="https://livetrancer.com">https://livetrancer.com</a>

## 概要:
LiveTrancerは、リアルタイムで音声入力を要約し、要約された内容を音声とテキストの両方でリアルタイムに出力するWebアプリケーションです。このアプリは、会議やプレゼンテーション、カスタマーサポート、学習環境など、さまざまなシーンでの音声情報を迅速かつ簡潔に把握するために設計されています。

## 主要機能:

### 音声入力: 
デバイスのマイクを通じて音声をキャプチャし、リアルタイムで処理します。

### 要約処理: 
キャプチャした音声をDeepgram APIを利用して要約し、簡潔な内容に変換します。

### リアルタイム出力: 
要約結果をテキストと音声で同時にリアルタイムで出力します。

### マルチデバイス対応: 
PCとスマートフォンの両方で使用可能。

### 技術スタック:

#### フロントエンド: 
- Next.js
- TypeScript

#### バックエンド:
- TypeScript
- Python or C

#### 音声処理: 
- Deepgram API
- Google TTS

#### 音声加工
- voicevox
  
#### テキスト加工
- ChatGPT 4-omni or ELYZA

#### デプロイ:
- AWS

## 用途:

### ビジネスミーティング:
長時間の会議をリアルタイムで要約し、重要なポイントを迅速に把握。

### 教育現場: 
講義内容を要約し、学生が簡潔に理解できるようサポート。

### カスタマーサポート:
顧客対応の際に、重要な情報を要約して効率的に対応。

## MEMO

UPDATED:

STTの機能を実装しました。
実行するには、以下の手順に従って下さい。

Step1. Client側のサーバーを立ち上げる。
`cd LiveTrancer/live-trancer/`で移動した後、`npm run dev`を実行してください。

Step2. Server側のサーバーを立ち上げる。
`cd microservices/services/transcription`で移動した後、`npm run dev`を実行してください。

Step3. マイクのボタンをタップし、transcriptionページに移動。

Step4. Start recording!



<!-- 当初は、App Routerを使用していたが、Web Socketが使用できない等により、Page Routerを採用した。
おかげで5時間くらい無駄になってしまったが、Page Routerの方が幅広いアーキテクチャが採用できるため、まぁ勉強になっただろう。しかし、Page Routerを使用することでWeb Socketが対応するわけだが、VercelがSocketに未対応であるため、Hosting機能を別で用意する必要がある。Firebase Hostingとかかな。 -->

ほいで、アーキテクチャについてだけど、フロントエンドは、Atomic Designを採用し、バックエンドは、マイクロサービスを使用するつもりである。

