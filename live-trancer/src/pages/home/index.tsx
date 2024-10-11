import styles from "./home.module.css";
import TopSection from "../components/organisms/Home/TopSection/TopSection";
import SampleSection from "../components/organisms/Home/SampleSection/SampleSection";
import AbstractSection from "../components/organisms/Home/AbstractSection/AbstractSection";
import SttSection from "../components/organisms/Home/SttSection/SttSection";
import TransformTextSection from "../components/organisms/Home/TransformTextSection/TransformTextSection";
import TtsSection from "../components/organisms/Home/TtsSection/TtsSection";
import ApiSection from "../components/organisms/Home/ApiSection/ApiSection";
import StsSection from "../components/organisms/Home/StsSection/StsSection";
import ContactSection from "../components/organisms/Home/ContactSection/ContactSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TopSection></TopSection>
        <SampleSection></SampleSection>
        <AbstractSection></AbstractSection>
        <SttSection></SttSection>
        <TransformTextSection></TransformTextSection>
        <TtsSection></TtsSection>
        <ApiSection></ApiSection>
        <StsSection></StsSection>
        <ContactSection></ContactSection>

        {/* 概要説明セクション*/}
        {/*  LiveTrancerの概要、具体的に何を解決するツールなのか、使い方の簡単なフローを記載。
            例: 
            「1. 音声をリアルタイムでテキストに変換、
              2. テキストを自動的に加工、
              3. 加工された音声で返答」*/}

        {/* それぞれの機能の説明セクション*/}
        {/* LiveTrancerの主要機能をビジュアル的に説明。
STT（Speech-to-Text）: 音声をテキストに変換するプロセスの精度やスピードについての説明。
TTS（Text-to-Speech）: 加工されたテキストを音声に再変換する機能、さまざまな音声パターンへの対応。
リアルタイム処理: リアルタイムで変換ができること、パフォーマンスの高さをアピール。 
API連携: 開発者向けに、LiveTrancerのAPIを利用して音声処理を自動化できるポイントを説明。
*/}

        {/*  ↓ 代わりにSTSの機能と予測導入事例を紹介　↓　*/}
        {/* 用途、使い方セクション*/}
        {/* 何のために、どういった場合に役に立つのかを説明する*/}


        {/* お問い合わせフォームセクション*/}
        {/*連絡が取れるようなフォームを用意する*/}

        {/* 
        参考デザインサイト：
    明るい   https://getzowie.com/
    ダークでクール    https://www.raycast.com/ */}
      </main>
    </div>
  );
}
