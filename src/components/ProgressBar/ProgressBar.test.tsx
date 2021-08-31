import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProgressBar from './index';
import { IProgressBar } from '../../types/components/ProgressBar.types';

describe('ProgressBar Component', () => {
  // Inital props
  const simpleProps: IProgressBar = {
    stepData: [
      {
        id: 0,
        label: 'Test Label',
        description: 'Test Label Page',
        secondaryLabel: 'Test Product',
      },
    ],
    currentIndex: 0,
    vertical: false,
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<ProgressBar {...simpleProps} />);

    expect(getByTestId('progress-bar')).toBeInTheDocument();
  });

  test('should be rendered without vertical prop', () => {
    const { getByTestId } = render(
      <ProgressBar
        {...{ stepData: simpleProps.stepData, currentIndex: simpleProps.currentIndex }}
      />
    );

    expect(getByTestId('progress-bar')).toBeInTheDocument();
  });

  test('should have currentIndex effects step icon filled', () => {
    const { getByTestId } = render(<ProgressBar {...simpleProps} />);

    const stepCircle = getByTestId(`progress-bar-step-${simpleProps.currentIndex}`).children[1]
      .children[0];

    expect(stepCircle.tagName).toBe('circle');
  });

  test('should vertically aligned based on props', () => {
    const updatedProps = Object.assign(simpleProps, { vertical: true });
    const { getByTestId } = render(<ProgressBar {...updatedProps} />);

    expect(
      Array.from(getByTestId('progress-bar').classList).includes('bx--progress--vertical')
    ).toBe(true);
  });

  test('should have elements count same as stepData prop length', () => {
    const updatedProps = Object.assign(simpleProps, {
      stepData: [
        {
          id: 0,
          label: 'Test Label',
          description: 'Test Label Page',
          secondaryLabel: 'Test Product',
        },
        {
          id: 1,
          label: 'Test Label - 1',
          description: 'Test Label Page - 1',
          secondaryLabel: 'Test Product - 1',
        },
      ],
    });
    const { getByTestId } = render(<ProgressBar {...updatedProps} />);

    expect(getByTestId('progress-bar').childElementCount).toBe(updatedProps.stepData.length);
  });
});
