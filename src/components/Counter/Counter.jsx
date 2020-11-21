import React, { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Counter.module.css';

export const Counter = ({initialValue, onChange, max}) => {
    const [value, setValue] = useState(initialValue);

    const decrease = () => {
        setValue(prev => {
            const newValue = prev - 1;
            onChange(newValue);
            return newValue;
        });
    }

    const increase = () => {
        setValue(prev => {
            const newValue = prev + 1;
            onChange(newValue);
            return newValue;
        });
    }

    return (
      <div className={styles.container}>
          <Button disabled={value === 1} onClick={decrease}>-</Button>
          <div className={styles.value}>{value}</div>
          <Button disabled={value === max} onClick={increase}>+</Button>
      </div>
    )
}
