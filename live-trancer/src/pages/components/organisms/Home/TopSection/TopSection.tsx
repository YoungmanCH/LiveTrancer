import React from "react";
import styles from "./TopSection.module.css";

const TopSection = () => {
  return (
    <section className={styles.topSection}>
      <div className={styles.centerPeople}></div>
      <div className={styles.centerPeopleContent}>
        <h1>REAL-TIME</h1>
        <h1>VOICE CHANGER</h1>
        <p>Experience real-time voice transformation with the power of AI.</p>
      </div>
    </section>
  );
};

export default TopSection;
