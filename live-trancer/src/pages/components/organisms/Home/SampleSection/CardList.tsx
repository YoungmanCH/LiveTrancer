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
  if (!cards || cards.length === 0) {
    return <p>No cards available</p>;
  }

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
