import React from 'react';
import { ProgressIndicator, ProgressStep } from 'carbon-components-react';
import styles from './ProgressBar.module.css';
import { IProgressBar } from '../../types/components/ProgressBar.types';

function ProgressBar({ stepData, currentIndex, vertical = false }: IProgressBar) {
  return (
    <ProgressIndicator
      className={styles.ProgressBar}
      vertical={vertical}
      currentIndex={currentIndex}
      spaceEqually
      data-testid="progress-bar"
    >
      {stepData.map((step, index) => (
        <ProgressStep
          key={step.id}
          className={styles.Step}
          label={step.label}
          description={step.description}
          secondaryLabel={step.secondaryLabel}
          data-testid={`progress-bar-step-${index}`}
        />
      ))}
    </ProgressIndicator>
  );
}

export default ProgressBar;
