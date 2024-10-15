import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, label, onClick, className }) => {
  return (
    <button className={`${type} ${styles.button} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
