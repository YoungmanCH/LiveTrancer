import React from "react";
import Image from "next/image";
import styles from "./TransformTextSection.module.css";
import { transformTextImage } from "../../../../../images";

const TransformTextSection = () => {
  return (
    <section className={styles.transformTextSection}>
      <div className={styles.imageContainer}>
        <div className={styles.transformTextImage}>
          <Image
            src={transformTextImage}
            alt="transformText image"
            width={700}
            height={700}
            className={styles.image}
          />
        </div>
        <div className={styles.imageHeader}>
          <h3 className={styles.imageTitle}>
            高精度・高速リアルタイムのテキスト加工
          </h3>
          <p className={styles.imageDescription}>
            認識されたテキストをコンテキストに応じて最適な表現に変換し、あらゆるシーンで正確な文字起こしを提供します。ビジネスの会議、教育の講義、日常の会話まで、95%の高精度と0.03秒の遅延で即座に対応。1秒間に202文字の処理速度を誇り、リアルタイムで確かなテキスト変換を実現します。
          </p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          認識されたテキストに応じて最適な表現に変換し、用途に合わせた正確な文字起こしを提供
        </h1>
        <p className={styles.description}>
          自動認識されたテキストを、そのコンテキストや目的に応じて最適な表現に変換。正確な文字起こしを提供し、ビジネス、教育、日常会話など、あらゆるシーンで使える柔軟性を備えています。
        </p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>95%</span>
            <span className={styles.statLabel}>精度</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>0.03秒</span>
            <span className={styles.statLabel}>遅延</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>202文字/秒</span>
            <span className={styles.statLabel}>処理速度</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformTextSection;

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
