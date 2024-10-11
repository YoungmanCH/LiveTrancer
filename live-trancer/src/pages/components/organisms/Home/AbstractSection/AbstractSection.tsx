import React from "react";
import styles from "./AbstractSection.module.css";
import Button from "../../../atoms/Button";

const AbstractSection = () => {
  return (
    <section className={styles.abstractSection}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          音声からテキスト、そして音声へ。リアルタイム変換で次世代のワークフローを実現。
        </h1>
        <p className={styles.description}>
          LiveTrancerの強力な3つの機能、STT（音声からテキストへの変換）、Transform
          Text（テキストの最適化）、TTS（テキストから音声への変換）を連携させたワークフローをご紹介します。リアルタイムで音声をテキスト化し、最適化されたテキストを瞬時に音声へ変換するシームレスなプロセスを通じて、ビジネスや教育、エンターテインメントなど、幅広いシーンで効率化を実現します。
        </p>
      </div>

      <div className={styles.steps}>
        <div className={styles.stepRow}>
          <h2 className={styles.stepTitle}>
            01 Convert speech into text in real-time.
          </h2>
          <button className={styles.button}>&gt;</button>
        </div>
        <p className={styles.stepDescription}>
          話された言葉を瞬時に高精度なテキストへと変換します。リアルタイムで字幕のように表示されます。
        </p>
        <div className={styles.stepRow}>
          <h2 className={styles.stepTitle}>
            02 Automatically process the transcribed text.
          </h2>
          <button className={styles.button}>&gt;</button>
        </div>
        <p className={styles.stepDescription}>
          変換されたテキストをAIが自動で整理・編集し、より理解しやすい形式に整えます。
        </p>
        <div className={styles.stepRow}>
          <h2 className={styles.stepTitle}>
            03 Get the processed text converted back into audio.
          </h2>
          <button className={styles.button}>&gt;</button>
        </div>
        <p className={styles.stepDescription}>
          編集済みのテキストを音声に変換し、即座に聞き取りやすい音声で返答します。
        </p>
      </div>
      <Button label={"Try It Now"} className={styles.tryNowButton} />
    </section>
  );
};

export default AbstractSection;

{
  /* 概要説明セクション*/
}
{
  /*  LiveTrancerの概要、具体的に何を解決するツールなのか、使い方の簡単なフローを記載。
            例: 
            「1. 音声をリアルタイムでテキストに変換、
              2. テキストを自動的に加工、
              3. 加工された音声で返答」*/
}
