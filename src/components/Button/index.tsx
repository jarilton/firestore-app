// src/components/Button.tsx
import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const buttonClass = [
    styles.button,
    disabled ? styles.disabled : styles[variant],
  ].join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {label}
    </button>
  );
};
