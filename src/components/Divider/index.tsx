import React from 'react';
import { IDivider } from '../../types/components/Divider.types';
import styles from './Divider.module.css';

function Divider({ thickness, marginY, width, color }: IDivider) {
  return (
    <div className={styles.Divider} data-testid="divider">
      <hr
        style={{
          height: `${thickness}px`,
          width: `${width}`,
          margin: `${marginY}px 0`,
          backgroundColor: `${color}`,
        }}
        data-testid="divider-line"
      />
    </div>
  );
}

export default React.memo(Divider);
