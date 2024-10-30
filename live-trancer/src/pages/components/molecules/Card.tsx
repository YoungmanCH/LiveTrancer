import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Card.module.css";
import Button from "../atoms/Button";
import { audioPlayBtnImage } from "../../../images";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/mode-selection");
  }
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
        <Button 
          type="play" 
          label=""
        />
      </div>
      <div className={styles.cardContent}>
        <Button 
          type="button" 
          label={buttonText} 
          onClick={handleButtonClick}
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
