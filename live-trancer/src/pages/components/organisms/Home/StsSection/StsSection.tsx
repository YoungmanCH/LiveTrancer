import React from "react";
import Image from "next/image";
import styles from "./StsSection.module.css";
import { realtimeResponseImage, automationImage, iotImage } from "../../../../../images";

const StsSection = () => (
  <section className={styles.stsSection}>
    <div className={styles.header}>
      <h1 className={styles.title}>LiveTrancer STSで音声対応を無人化</h1>
      <p className={styles.description}>
        音声の自動化と無人化をリアルタイムで実現するソリューション
      </p>
    </div>

    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <Image
          src={realtimeResponseImage}
          alt="Real-time response's image"
          layout="responsive"
          className={styles.image}
        />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>リアルタイム音声対応</h3>
          <p className={styles.cardDescription}>
            音声をリアルタイムで認識し、適切な音声でレスポンスすることで、多言語対応や音声モデレーションが可能。
          </p>
          <div className={styles.badge}>Check</div>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          src={automationImage}
          alt="Automation image"
          layout="responsive"
          className={styles.image}
        />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>無人化対応</h3>
          <p className={styles.cardDescription}>
            自動化された音声ガイドや応答システムにより、人的リソースを削減し、完全無人化が可能。
          </p>
          <div className={styles.badge}>Check</div>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          src={iotImage}
          alt="Iot image"
          layout="responsive"
          className={styles.image}
        />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>柔軟な対応性</h3>
          <p className={styles.cardDescription}>
            様々なハードウェア（レジ、IoTデバイス、ロボット）と連携し、音声対応システムを簡単に導入可能。
          </p>
          <div className={styles.badge}>Check</div>
        </div>
      </div>
    </div>
  </section>
);

export default StsSection;

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
