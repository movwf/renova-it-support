import React from 'react';
import { Row } from 'carbon-components-react';
import ProgressBar from '../../../../components/ProgressBar';
import styles from '../Repair.module.css';

interface IFormProgress {
  currentIndex: number;
}

function FormProgress({ currentIndex }: IFormProgress) {
  return (
    <Row className={styles.ProgressBar} data-testid="form-progress">
      <ProgressBar
        stepData={[
          {
            id: 0,
            label: 'Product',
            description: 'Product Selection Page',
            secondaryLabel: 'Select Product',
          },
          {
            id: 1,
            label: 'Information',
            description: 'Customer Information Entry Page',
            secondaryLabel: 'Customer',
          },
          {
            id: 2,
            label: 'Problem',
            description: 'Brief Explanation of Problem Page',
            secondaryLabel: 'Brief Exp.',
          },
          {
            id: 3,
            label: 'Submit',
            description: 'Final Page',
            secondaryLabel: '',
          },
        ]}
        currentIndex={currentIndex}
      />
    </Row>
  );
}

export default React.memo(FormProgress);
