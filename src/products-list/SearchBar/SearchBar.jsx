import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

export function SearchBar({ onSearch = () => {} }) {
    const [text, setText] = useState('');
    const disabledSearch = !text;
    const handleEnter = (event) => {
        if (event.keyCode === 13 && !disabledSearch) {
            onSearch(text);
        }
    }
    const clear = () => {
        setText('');
        onSearch('');
    }
    const handleTextChange = (value) => {
        setText(value);
        if (value === '') {
            onSearch('');
        }
    }
    return (
      <div className={styles.container}>
          <div className={styles.inputContainer}>
            <Input value={text} onChange={handleTextChange} onKeyDown={handleEnter} placeholder={'Szukaj produktu...'}/>
            {text ? <Button onClick={clear} className={styles.clearButton}>Wyczyść</Button> : null}
          </div>
          <Button className={styles.searchButton} disabled={disabledSearch} onClick={() => onSearch(text)}>Szukaj</Button>
      </div>
    );
}
