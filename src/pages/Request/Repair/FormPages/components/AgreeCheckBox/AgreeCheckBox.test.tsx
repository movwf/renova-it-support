import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import AgreeCheckBox from '.';
import { FormProvider } from '../../../../../../contexts/FormContext';

describe('AgreeCheckBox Component', () => {
  test('should render', () => {
    render(
      <MockedProvider>
        <FormProvider>
          <AgreeCheckBox
            id="agree-box"
            labelText="Test"
            formId="agree.privacy"
            formPage="problem"
          />
        </FormProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('agree-check')).toBeInTheDocument();
  });
});
