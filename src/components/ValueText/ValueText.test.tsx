import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ValueText from './index';
import { IValueText } from '../../types/components/ValueText.types';

describe('ValueText Component', () => {
  // Inital props
  const simpleProps: IValueText = {
    style: { color: 'red' },
    propertyWidth: '100px',
    propertyText: 'Test Key',
    valueText: 'Test Value',
    children: <span data-testid="value-text-children">I am a children!</span>,
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<ValueText {...simpleProps} />);

    expect(getByTestId('value-text')).toBeInTheDocument();
  });

  test('should be rendered only with propertyText prop', () => {
    const updatedProps = { propertyText: "I'm the only one!" };
    const { getByTestId } = render(<ValueText {...updatedProps} />);

    expect(getByTestId('value-text')).toBeInTheDocument();
  });

  test('should have property key set with props', () => {
    const { getByTestId } = render(<ValueText {...simpleProps} />);

    expect(getByTestId('value-text-property').innerHTML).toBe(simpleProps.propertyText);
  });

  test('should have value text set with props', () => {
    const { getByTestId } = render(<ValueText {...simpleProps} />);

    expect(getByTestId('value-text-value').innerHTML).toBe(simpleProps.valueText);
  });

  test('should have children inside tags', () => {
    const updatedProps = { propertyText: "I'm the only one!" };
    const { getByTestId } = render(<ValueText {...updatedProps}>{simpleProps.children}</ValueText>);

    expect(getByTestId('value-text-children')).toBeInTheDocument();
  });

  test('should have style (color) set with props', () => {
    const { getByTestId } = render(<ValueText {...simpleProps} />);

    // @ts-ignore
    expect(getByTestId('value-text')).toHaveStyle({ color: simpleProps.style.color });
  });
});
