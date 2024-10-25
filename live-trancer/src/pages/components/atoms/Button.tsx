import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "play" | "tryNow" | "submit";
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type="play" , label, onClick, className }) => {
  return (
    <button className={`${type} ${styles[type]} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
