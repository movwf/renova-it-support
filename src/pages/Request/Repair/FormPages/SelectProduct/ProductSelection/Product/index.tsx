import React from 'react';
import styles from '../../SelectProduct.module.css';

interface IProduct {
  name: string;
  icon: JSX.Element;
  color: string;
  [prop: string]: any;
}

function Product({ name, icon, color, ...props }: IProduct) {
  return (
    <div className={styles.Product} style={{ backgroundColor: `${color}` }} {...props}>
      <span className={styles.ProductIcon}>{icon}</span>
      <span className={styles.ProductName}>{name}</span>
    </div>
  );
}

export default React.memo(Product);
