import React from 'react';
import { Column } from 'carbon-components-react';
import SerialNumber from './SerialNumber';
import AgreeCheckBox from '../components/AgreeCheckBox';
import ProductSelection from './ProductSelection';

function SelectProduct() {
  return (
    <Column data-testid="select-product-page">
      <ProductSelection />
      <SerialNumber />
      <AgreeCheckBox
        id="privacy-policy"
        labelText="I agree to provide the above information to Rénova to fulfill my request for customer support service, and also agree to the “Rénova Privacy Policy”."
        formId="agree.privacy"
        formPage="selectProduct"
      />
    </Column>
  );
}

export default SelectProduct;
