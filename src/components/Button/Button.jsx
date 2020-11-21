import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

export const Button = ({ onClick, children, disabled, className = '', variant = 'normal', type }) => {
    return (
      <button
        className={classNames(styles.button, className, {[styles.active]: variant === 'active'})}
        onClick={onClick}
        disabled={disabled}
        data-testid={variant}
        type={type}
      >
          {children}
      </button>
    )
}
