import React from 'react';
import {
  Column,
  DatePicker,
  DatePickerInput,
  Row,
  TextArea,
  TextInput,
} from 'carbon-components-react';
import { FormContext } from '../../../../../../contexts/FormContext';
import styles from '../CustomerInformation.module.css';

function InfoFormFields() {
  const { forms } = React.useContext(FormContext);
  const {
    register,
    formState: { errors },
  } = forms.customerInformation;

  return (
    <>
      <Row className={styles.InputRow} data-testid="info-form-fields">
        <Column className={styles.Input}>
          <TextInput
            id="name-surname"
            labelText="Name Surname *"
            placeholder="E.g: Carl Johnson"
            invalid={!!errors?.name}
            invalidText={errors?.name?.message}
            {...register('name')}
          />
        </Column>
        <Column className={styles.Input}>
          <TextInput
            id="email"
            labelText="E-mail Address *"
            placeholder="E.g: cj@renova.com"
            invalid={!!errors?.email}
            invalidText={errors?.email?.message}
            {...register('email')}
          />
        </Column>
      </Row>
      <Row className={styles.InputRow}>
        <Column className={styles.Input}>
          <TextInput
            id="nationality"
            labelText="Nationality Number"
            placeholder="E.g: 264xxxxxxxx"
            invalid={!!errors?.nationalityId}
            invalidText={errors?.nationalityId?.message}
            {...register('nationalityId')}
          />
        </Column>
        <Column>
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Birthdate"
              type="date"
              id="birthdate"
              invalid={!!errors?.birthdate}
              invalidText={errors?.birthdate?.message}
              {...register('birthdate')}
            />
          </DatePicker>
        </Column>
      </Row>
      <Row>
        <Column>
          <TextArea
            id="address"
            labelText="Address"
            placeholder="Address"
            minLength={20}
            maxLength={500}
            invalid={!!errors?.address}
            invalidText={errors?.address?.message}
            {...register('address')}
          />
        </Column>
      </Row>
    </>
  );
}

export default InfoFormFields;
