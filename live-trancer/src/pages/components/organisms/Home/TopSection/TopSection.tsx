import React from "react";
import styles from "./TopSection.module.css";

const TopSection = () => {
  return (
    <section className={styles.topSection}>
      <div className={styles.content}>
        <h1>Real-Time</h1>
        <h1>Speak, Convert, Express</h1>
        <p>話し、変換し、伝える&mdash;すべてが瞬時に。新しいビジネスから日常体験を今すぐ。</p>
      </div>
    </section>
  );
};

export default TopSection;
