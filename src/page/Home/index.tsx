import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../firabase/firabase';
import { Input } from '../../components/Input'; 
import { Button } from '../../components/Button';


interface Item {
  id: string;
  text: string;
}

export const Home: React.FC = ()  => {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = async () => {
    if (inputValue.trim() !== "") {
      await addDoc(collection(db, "items"), { text: inputValue });
      setInputValue("");
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemList: Item[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
      setItems(itemList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Input 
        label="Digite um texto abaixo "
        value={inputValue}
        onChange={handleInputChange}
      />
      
      <Button
        label="Enviar"
        onClick={handleAddItem}
        variant="primary"
      />
      <ul>
        {items.map(item => {
          console.log('item', item);
          return (
            <li key={item.id}>{item.text}</li>
          )
        })}
      </ul>
    </div>
  );
}

