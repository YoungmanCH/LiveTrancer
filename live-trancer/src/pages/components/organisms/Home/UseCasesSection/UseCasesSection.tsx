import React from "react";
import Image from "next/image";
import styles from "./UseCasesSection.module.css";
import { ttsImage } from "../../../../../images";

const UseCasesSection = () => {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          予測導入事例
        </h1>
        <p className={styles.description}>
          LiveTrancerのTTS機能は、加工されたテキストを目的に応じた音声にリアルタイムで変換。複数の音声パターンや自然なイントネーションに対応し、ユーザーに合った音声体験を提供します。ビジネスや教育、エンターテインメントシーンでも幅広く活用可能。
        </p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>51種類</span>
            <span className={styles.statLabel}>音声パターン</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>0.03秒</span>
            <span className={styles.statLabel}>遅延</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>日本語/英語</span>
            <span className={styles.statLabel}>対応言語</span>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.ttsImage}>
          <Image
            src={ttsImage}
            alt="TTS image"
            width={700}
            height={700}
            className={styles.image}
          />
        </div>
        <div className={styles.imageHeader}>
          <h3 className={styles.imageTitle}>
            あらゆるシーンに最適な音声体験を、しかも瞬時に。
          </h3>
          <p className={styles.imageDescription}>
            51種類以上の音声パターンと300ミリ秒以内の低遅延で、瞬時に加工されたテキストを用途に合わせた最適な音声に変換。高いカスタマイズ性で、聞く人に応じた柔軟な音声体験を実現します。
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
