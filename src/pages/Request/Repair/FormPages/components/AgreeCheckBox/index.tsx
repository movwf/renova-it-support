import React from 'react';
import { Checkbox, Column, Row } from 'carbon-components-react';
import styles from './AgreeCheckBox.module.css';
import { FormContext } from '../../../../../../contexts/FormContext';

interface IAgreeCheckBox {
  id: string;
  labelText: string;
  formId: string;
  formPage: string;
  [props: string]: any;
}

function AgreeCheckBox({ id, labelText, formId, formPage }: IAgreeCheckBox) {
  const { formData, forms } = React.useContext(FormContext);
  const [agree, agreementId] = formId.split('.');
  const {
    register,
    unregister,
    formState: { errors },
  } = forms[formPage];
  const storedCheckState = () => {
    if (formData?.[agree] && formData?.[agree]?.[agreementId]) return formData[agree][agreementId];

    return false;
  };
  const [agreed, setAgreed] = React.useState(storedCheckState() || false);

  const registerCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    unregister(formId); // Unregister for check state change

    setAgreed(!agreed); // Visual state

    register(formId, { value: e }); // Register with current state
  };

  return (
    <Row className={styles.PrivacyPolicy} data-testid="agree-check">
      <Column>
        <Checkbox id={id} labelText={labelText} checked={agreed} onChange={registerCheckBox} />
        {errors[agree] && errors[agree][agreementId] && (
          <span className={styles.ErrorMessage}>{errors[agree][agreementId].message}</span>
        )}
      </Column>
    </Row>
  );
}

export default React.memo(AgreeCheckBox);
