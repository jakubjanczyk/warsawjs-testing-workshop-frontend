import styles from './Select.module.css';
import React from 'react';
import classNames from 'classnames'

export const Select = ({selected, options, onSelect, className = ''}) => {
    return (
      <select className={classNames(styles.select, className)} value={selected} onChange={(e) => onSelect(e.target.value)}>
          {
              options.map(value => (
                <option key={value.key} value={value.key}>{value.label}</option>
              ))
          }
      </select>
    );
}
