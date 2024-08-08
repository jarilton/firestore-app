import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from './firabase/firabase';

interface Item {
  id: string;
  text: string;
}

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = async () => {
    if (inputValue.trim() !== "") {
      await addDoc(collection(db, "items"), { text: inputValue });
      setInputValue("");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemList: Item[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
      setItems(itemList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={handleAddItem}>Enviar</button>
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

export default App;
