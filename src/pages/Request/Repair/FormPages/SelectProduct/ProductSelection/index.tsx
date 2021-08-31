import React from 'react';
import { Row } from 'carbon-components-react';
import styles from '../SelectProduct.module.css';
import Icons from './Icons';
import Product from './Product';
import QuestionTitle from '../../components/QuestionTitle';
import { FormContext } from '../../../../../../contexts/FormContext';

function ProductSelection() {
  const { formData, forms } = React.useContext(FormContext);
  const { register } = forms.selectProduct;

  const [selectedProduct, setSelectedProduct] = React.useState(formData.product || 'pc');

  const registerProducts = (id: string) => {
    setSelectedProduct(id);

    register('product', { value: id });
  };

  const paintSelectedColor = (id: string) => {
    if (id === selectedProduct) return '#e2e2e2';

    return 'inherit'; // For default or unselected color
  };

  React.useEffect(() => {
    register('product', { value: selectedProduct }); // Initial setup for product in order not to pass empty

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row data-testid="product-selection">
        <QuestionTitle
          title="Select Your Product"
          description="Select your product type for identyfication."
        />
      </Row>
      <Row className={styles.ProductSelection}>
        <div className={styles.ProductList}>
          {/* TODO: Config ~this~ */}
          {[
            { id: 'pc', icon: Icons.pc, name: 'PC' },
            { id: 'notebook', icon: Icons.laptop, name: 'Notebook' },
            { id: 'monitor', icon: Icons.monitor, name: 'Monitor' },
            { id: 'phone', icon: Icons.phone, name: 'Phone' },
            { id: 'cpu', icon: Icons.cpu, name: 'CPU' },
            { id: 'motherboard', icon: Icons.motherboard, name: 'Motherboard' },
            { id: 'videocard', icon: Icons.videocard, name: 'Video Card' },
            { id: 'ram', icon: Icons.ram, name: 'RAM' },
          ].map((product) => (
            <Product
              key={product.id}
              icon={product.icon}
              name={product.name}
              color={paintSelectedColor(product.id)}
              onClick={() => registerProducts(product.id)}
              data-testid={`product-selection-${product.id}`}
            />
          ))}
        </div>
      </Row>
    </>
  );
}

export default ProductSelection;
