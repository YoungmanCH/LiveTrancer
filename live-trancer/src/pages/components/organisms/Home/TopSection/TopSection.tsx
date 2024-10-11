import React from "react";
import styles from "./TopSection.module.css";

const TopSection = () => {
  return (
    <section className={styles.topSection}>
      <div className={styles.centerPeople}></div>
      <div className={styles.centerPeopleContent}>
        <h1>REAL-TIME</h1>
        <h1>VOICE CHANGER</h1>
        <p>音声をテキストに、そしてまた音声に。リアルタイムの変換を体感せよ。</p>
      </div>
    </section>
  );
};

export default TopSection;
