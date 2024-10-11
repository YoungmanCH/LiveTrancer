import React from "react";
import Image from "next/image";
import styles from "./ApiSection.module.css";
import { apiImage } from "../../../../../images";

const ApiSection = () => {
  return (
    <section className={styles.ApiSection}>
      <div className={styles.imageContainer}>
        <div className={styles.transformTextImage}>
          <Image
            src={apiImage}
            alt="API image"
            width={700}
            height={700}
            className={styles.image}
          />
        </div>
        <div className={styles.imageHeader}>
          <h3 className={styles.imageTitle}>
            音声処理、テキスト加工をシンプルに、APIで可能性を広げる
          </h3>
          <p className={styles.imageDescription}>
            LiveTrancer
            APIは、音声を自動的に認識してテキストに変換する機能を提供し、リアルタイムの会話分析や、音声ベースの操作システム、会議録音の自動化など、あらゆる分野に対応します。ビジネスの効率化から、音声インターフェースを持つ新しいアプリケーション開発まで、幅広い用途で利用可能です。
          </p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.apiTitle}>LIVE TRANCER API</h2>
        <h2 className={styles.title}>音声処理を自動化するパワフルなツール</h2>
        <p className={styles.description}>
          LiveTrancer
          APIは、各機能毎に音声認識やテキスト変換を簡単に統合できます。開発者は、高精度な音声処理機能をシステムに組み込むことで、ビジネスやアプリケーションに新しい可能性を提供できます。自動化された音声処理により、ユーザーエクスペリエンスを向上させ、作業効率を大幅に改善します。
        </p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>STT</span>
            <span className={styles.statLabel}>音声をテキストに変換</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>Transform Text</span>
            <span className={styles.statLabel}>テキストを最適化</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>TTS</span>
            <span className={styles.statLabel}>テキストを音声に変換</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiSection;

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
