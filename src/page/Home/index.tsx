import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firabase/firabase";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Lottie from "react-lottie";
import * as animationData from "../../assets/lotties/not-found.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./home.module.scss";

interface Item {
  id: string;
  text: string;
}

export const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const LottieOptions = {
    animationData,
    loop: true,
    autoplay: true,
  };

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

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "items", id));
      console.log("Item deletado:", id);
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  const handleEditItem = async (id: string) => {
    try {
      await updateDoc(doc(db, "items", id), { text: editValue });
      setEditingItemId(null);
      setEditValue("");
    } catch (error) {
      console.error("Erro ao editar item:", error);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleEditChange = (value: string) => {
    setEditValue(value);
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
            {items.length > 0 ? (
              items.map((item) => (
                <div className={styles.message} key={item.id}>
                  <div>
                    {editingItemId === item.id ? (
                      <Input
                        label=""
                        value={editValue}
                        onChange={handleEditChange}
                        placeholder="Editando mensagem"
                      />
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                  <div className={styles.buttonContainer}>
                    {editingItemId === item.id ? (
                      <button
                        className={styles.saveButton}
                        onClick={() => handleEditItem(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faSave}
                          color="white"
                          size="1x"
                        />
                      </button>
                    ) : (
                      <button
                        className={styles.editButton}
                        onClick={() => {
                          setEditingItemId(item.id);
                          setEditValue(item.text);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          color="white"
                          size="1x"
                        />
                      </button>
                    )}
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} color="white" size="1x" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.boxLottie}>
                <Lottie
                  options={LottieOptions}
                  width="10rem"
                  height="10rem"
                  style={{
                    margin: "none",
                  }}
                />
                <span>Ops! Nenhuma mensagem enviada</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
