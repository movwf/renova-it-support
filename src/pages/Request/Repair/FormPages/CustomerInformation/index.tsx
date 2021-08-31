import React from 'react';
import { Column } from 'carbon-components-react';
import QuestionTitle from '../components/QuestionTitle';
import AgreeCheckBox from '../components/AgreeCheckBox';
import InfoFormFields from './InfoFormFields';

function CustomerInformation() {
  return (
    <Column data-testid="customer-information">
      <QuestionTitle
        title="Customer Information"
        description="Please provide your personal information in order to contact you."
      />
      <InfoFormFields />
      <AgreeCheckBox
        id="terms-of-services"
        labelText="I agree to provide the above information to Rénova to fulfill my request for product repair service and I hereby declare that I have read, understood and accept the Terms and Conditions."
        formId="agree.tos"
        formPage="customerInformation"
      />
    </Column>
  );
}

export default React.memo(CustomerInformation);
