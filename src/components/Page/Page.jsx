import React from 'react';
import styles from './Page.module.css';

export const Page = ({children}) => {
    return (
      <div className={styles.page}>
          {children}
      </div>
    )
}
