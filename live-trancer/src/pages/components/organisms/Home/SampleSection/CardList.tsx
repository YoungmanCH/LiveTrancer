import React from "react";
import { StaticImageData } from "next/image";
import Card from "../../../molecules/Card";
import styles from "./CardList.module.css";

interface CardListProps {
  cards: {
    imgSrc: StaticImageData;
    imgAlt: string;
    title: string;
    description: string;
    buttonText: string;
  }[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className={styles.cardsContainer}>
      {cards.map((card, index) => (
        <Card
          key={index}
          imgSrc={card.imgSrc}
          imgAlt={card.imgAlt}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
        />
      ))}
    </div>
  );
};

export default CardList;
