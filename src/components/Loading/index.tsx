// src/components/Loading/Loading.tsx
import React from "react";
import styles from "./Loading.module.scss";

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Carregando...",
}) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};
