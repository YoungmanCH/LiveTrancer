import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Card.module.css";
import Button from "../atoms/Button";
import { audioPlayBtnImage } from "../../../images";

interface CardProps {
  imgSrc: StaticImageData;
  imgAlt: string;
  title: string;
  description: string;
  buttonText: string;
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContentWrapper}>
        <div className={styles.characterImage}>
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={150}
            height={150}
            className={styles.radius}
          />
        </div>
        <div className={styles.playButton}>
          <Image
            src={audioPlayBtnImage}
            alt="audio play button"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className={styles.cardContent}>
        <Button label={buttonText} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
