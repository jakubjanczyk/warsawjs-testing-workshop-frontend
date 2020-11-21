import React from 'react';
import styles from './TextArea.module.css';

export const TextArea = ({value, onChange}) => {
    return (
      <textarea className={styles.textarea} value={value} onChange={(event) => onChange(event.target.value)} />
    )
};
