import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import styles from './ColorPicker.module.css';

export const ColorPicker = ({ colors, initial, onChange }) => {
    const [selected, setSelected] = useState(initial);

    const handleSelect = (key) => {
        setSelected(key);
        onChange(key);
    };
    return (
      <div>
          {colors.map(({ key, label }) => (
            <Button className={styles.button} variant={key === selected ? 'active' : 'normal'} key={key} onClick={() => handleSelect(key)}>
                {label}
            </Button>
          ))}
      </div>
    );
};
