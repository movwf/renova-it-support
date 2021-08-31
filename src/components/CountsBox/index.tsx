import React from 'react';
import { ICountsBox } from '../../types/components/CountsBox.types';
import styles from './CountsBox.module.css';

function CountsBox({ title, count, width, height }: ICountsBox) {
  return (
    <div
      className={styles.CountsBox}
      style={{ width: `${width}`, height: `${height}` }}
      data-testid="counts-box"
    >
      <span className={styles.TopRow} data-testid="counts-box-title">
        {title}
      </span>
      <span className={styles.BottomRow} data-testid="counts-box-count">
        {count}
      </span>
    </div>
  );
}

export default React.memo(CountsBox);
