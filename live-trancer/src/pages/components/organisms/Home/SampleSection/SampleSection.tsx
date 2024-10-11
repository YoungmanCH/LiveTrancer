import React from "react";
import styles from "./SampleSection.module.css";
import CardList from "./CardList";

import {
  smilingBrightlyGirlImage,
  japaneseManImage,
  doctorImage,
} from "../../../../../images";

const SampleSection = () => {
  const cards = [
    {
      imgSrc: japaneseManImage,
      imgAlt: "Japanese man",
      title: "Japanese man",
      description: "Changed to an ordinary Japanese male voice.",
      buttonText: "Try It ↗︎",
    },
    {
      imgSrc: smilingBrightlyGirlImage,
      imgAlt: "Smiling Brightly Girl",
      title: "Anime character",
      description: "Changed to an ordinary anime character voice.",
      buttonText: "Try It ↗︎",
    },
    {
      imgSrc: doctorImage,
      imgAlt: "Doctor",
      title: "Doctor",
      description: "Changed to an ordinary doctor voice.",
      buttonText: "Try It ↗︎",
    },
  ];

  return (
    <section className={styles.sampleSection}>
      <div className={styles.sampleContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Real-time audio processing</h1>
          <a href="#" className={styles.seeAll}>
            See All →
          </a>
        </div>
        <CardList cards={cards} />
      </div>
    </section>
  );
};

export default SampleSection;
