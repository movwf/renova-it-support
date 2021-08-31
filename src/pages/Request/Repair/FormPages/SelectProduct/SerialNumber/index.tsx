import React from 'react';
import { Row, TextInput } from 'carbon-components-react';
import QuestionTitle from '../../components/QuestionTitle';
import styles from './SerialNumber.module.css';
import { FormContext } from '../../../../../../contexts/FormContext';

function SerialNumber() {
  const { forms } = React.useContext(FormContext);
  const {
    register,
    formState: { errors },
  } = forms.selectProduct;

  return (
    <>
      <Row data-testid="serial-number-title">
        <QuestionTitle
          title="Enter serial number"
          description="Provide serial number for model identyfication."
        />
      </Row>
      <Row>
        <div className={styles.SerialNumberInput}>
          <TextInput
            id="serial-number"
            labelText="Serial Number"
            {...register('serialNumber')}
            invalid={!!errors?.serialNumber}
            invalidText={errors?.serialNumber?.message}
          />
        </div>
      </Row>
    </>
  );
}

export default SerialNumber;
