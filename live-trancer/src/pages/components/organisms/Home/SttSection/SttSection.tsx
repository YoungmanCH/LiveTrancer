import React from "react";
import Image from "next/image";
import styles from "./SttSection.module.css";
import { sttImage } from "../../../../../images";

const SttSection = () => {
  return (
    <section className={styles.sttSection}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>リアルタイムで音声をテキストに変換</h1>
        <p className={styles.description}>
          STT機能では、音声を即座にテキストへと変換し、高精度でリアルタイムに文字起こしが可能です。複数言語に対応し、ビジネス、教育、カスタマーサポートなどさまざまな用途で活用できます。
        </p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>98%</span>
            <span className={styles.statLabel}>精度</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>0.02秒</span>
            <span className={styles.statLabel}>遅延</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>日本語/英語</span>
            <span className={styles.statLabel}>対応言語</span>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.sttImage}>
          <Image
            src={sttImage}
            alt="STT image"
            width={700}
            height={700}
            className={styles.image}
          />
        </div>
        <div className={styles.imageHeader}>
          <h3 className={styles.imageTitle}>いつでもどこでも、簡単に。</h3>
          <p className={styles.imageDescription}>
            スマホでもPCでも、オンライン環境さえあれば、いつでもどこでもリアルタイムに音声をテキストに変換可能。使いやすいインターフェースで、日常の会話やビジネスシーンを支えます。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SttSection;

{
  /* それぞれの機能の説明セクション*/
}
{
  /* LiveTrancerの主要機能をビジュアル的に説明。
STT（Speech-to-Text）: 音声をテキストに変換するプロセスの精度やスピードについての説明。
TTS（Text-to-Speech）: 加工されたテキストを音声に再変換する機能、さまざまな音声パターンへの対応。
API連携: 開発者向けに、LiveTrancerのAPIを利用して音声処理を自動化できるポイントを説明。
リアルタイム処理: リアルタイムで変換ができること、パフォーマンスの高さをアピール。 */
}
