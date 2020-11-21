import React from 'react';
import styles from './Input.module.css';

export const Input = ({value, type = 'text', onChange, onKeyDown, placeholder=''}) => {
    return (
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
    )
}
