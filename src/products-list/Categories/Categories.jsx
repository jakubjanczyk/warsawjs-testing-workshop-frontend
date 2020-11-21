import styles from './Categories.module.css';
import React, { useState } from 'react';
import classNames from 'classnames';

export function Categories({ onSelect, categories = [] }) {
    const [selected, setSelected] = useState(undefined);

    const toggleSelection = (category) => {
        setSelected((previouslySelected) => {
            const newSelected = previouslySelected === category ? undefined : category;
            onSelect(newSelected);
            return newSelected;
        });
    };

    return (
      <div className={styles.container}>
          <h3 className={styles.header}>Kategorie</h3>
          <ul className={styles.categories}>
              {categories.map(category => {
                  const selectedCategory = selected === category.key;
                  return (
                    <li
                      key={category.key}
                      onClick={() => toggleSelection(category.key)}
                      className={classNames(styles.category, {[styles.selected]: selectedCategory})}
                      data-testid={selectedCategory ? 'selected-category' : ''}
                    >
                        {category.label}
                    </li>
                  )
              })}
          </ul>
      </div>
    );
}
