import React from 'react';
import { IValueText } from '../../types/components/ValueText.types';
import styles from './ValueText.module.css';

function ValueText({
  style,
  propertyWidth = 'inherit',
  propertyText,
  valueText,
  children,
}: IValueText) {
  return (
    <div className={styles.ValueText} style={style} data-testid="value-text">
      <span
        className={styles.Property}
        style={{ width: `${propertyWidth}` }}
        data-testid="value-text-property"
      >
        {propertyText}
      </span>
      {valueText ? (
        <span className={styles.Value} data-testid="value-text-value">
          {valueText}
        </span>
      ) : (
        children
      )}
    </div>
  );
}

export default React.memo(ValueText);
