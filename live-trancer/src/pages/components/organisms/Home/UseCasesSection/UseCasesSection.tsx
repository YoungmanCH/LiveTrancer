import React from "react";
import Image from "next/image";
import styles from "./UseCasesSection.module.css";
import { noManImage, automatedVoiceImage, automatedRetailImage, publicFacilityImage } from "../../../../../images";

const UseCasesSection = () => {
  return (
    <section className={styles.useCasesSection}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>予測導入事例</h1>
        <p className={styles.headerDescription}>
          LiveTrancer
          STS（Speech-to-Speech）は、音声をリアルタイムで認識し、必要に応じて他の音声に変換する高度な音声自動化システムです。これにより、多言語対応や音声モデレーションが可能となり、さまざまな業界で効率化と無人化を実現します。以下は、LiveTrancer
          STSが活用される予測導入事例の一部です。
        </p>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <div className={styles.imageContainer}>
            <Image
              src={noManImage}
              alt="No man's Image"
              width={700}
              height={700}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>無人レジの音声対応化</h2>
            <p className={styles.description}>
              無人レジにSTSを導入することで、顧客は音声ガイドに従いスムーズに支払いを完了できます。
              多言語対応が可能で、多国籍の顧客にも適応。レジの操作方法を音声でリアルタイムに案内します。
            </p>
          </div>
        </div>

        <div className={`${styles.gridItem} ${styles.reverse}`}>
          <div className={styles.imageContainer}>
            <Image
              src={automatedVoiceImage}
              alt="Automated voice's Image"
              width={700}
              height={700}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>自動音声応答システムの無人化</h2>
            <p className={styles.description}>
              カスタマーサポートのIVRシステムにSTSを組み込み、ユーザーが問い合わせをすると自動音声で返答します。
              24時間対応可能な無人システムを実現し、顧客満足度を向上します。
            </p>
          </div>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.imageContainer}>
            <Image
              src={automatedRetailImage}
              alt="Automated retail's image"
              width={700}
              height={700}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>対話型無人店舗の実現</h2>
            <p className={styles.description}>
              顧客が店頭で商品について質問すると、STSがリアルタイムで音声応答し、購入手続きを音声のみで完了します。
              家電量販店やコンビニエンスストアでの自動案内システムに適用できます。
            </p>
          </div>
        </div>

        <div className={`${styles.gridItem} ${styles.reverse}`}>
          <div className={styles.imageContainer}>
            <Image
              src={publicFacilityImage}
              alt="Public facility' image"
              width={700}
              height={700}
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>公共施設での多言語対応案内システム</h2>
            <p className={styles.description}>
              観光案内所や空港で、観光客が音声で質問すると、リアルタイムで適切な言語に変換し案内します。
              訪問者が多言語での案内を求める場面での活用が可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
