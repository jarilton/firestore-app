import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firabase/firabase";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styles from "./home.module.scss";

interface Item {
  id: string;
  text: string;
}

export const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = async () => {
    if (inputValue.trim() !== "") {
      try {
        await addDoc(collection(db, "items"), { text: inputValue });
        console.log("Adding item:", inputValue);
        setInputValue("");
        console.log("Input value after setInputValue:", inputValue);
      } catch (error) {
        console.error("Erro ao adicionar item:", error);
      }
    } else {
      console.log("Campo de input vazio");
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "items"),
      (snapshot) => {
        const itemList: Item[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Item)
        );
        setItems(itemList);
      },
      (error) => {
        console.error("Erro ao buscar itens:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.boxOne}>
        <div className={styles.backgroundTop}>
          <div className={styles.boxLogo}>
            <img
              src={require("../../assets/logo.png")}
              alt="Logo"
              className={styles.logo}
            />
          </div>
          <div className={styles.box}>
            <Input
              label="Digite um texto abaixo"
              placeholder="Insira sua mensagem*"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className={styles.boxButton}>
              <Button
                label="Enviar"
                onClick={handleAddItem}
                variant="primary"
                disabled={inputValue.trim() === "" ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.boxTwo}>
        <div className={styles.boxContent}>
          <div className={styles.boxtitleMessage}>
            <span className={styles.titleMessage}>Mensagens Enviadas</span>
          </div>
          <div className={styles.cardMessage}>
            {items.map((item) => {
              return (
                <span className={styles.message} key={item.id}>
                  {item.text}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
