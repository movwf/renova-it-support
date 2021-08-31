import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tools20 } from '@carbon/icons-react';

import StripMenuButton, { IStripMenuButton } from './index';

describe('StripMenuButton Component', () => {
  // Inital props
  const simpleProps: IStripMenuButton = {
    icon: <Tools20 />,
    label: 'Test Label',
    href: '/test',
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<StripMenuButton {...simpleProps} />);

    expect(getByTestId('strip-menu-link')).toBeInTheDocument();
  });

  test('should have label set with props', () => {
    const { getByTestId } = render(<StripMenuButton {...simpleProps} />);

    expect(getByTestId('strip-menu-label').innerHTML).toBe(simpleProps.label);
  });

  test('should have href set with props', () => {
    const { getByTestId } = render(<StripMenuButton {...simpleProps} />);

    // @ts-ignore
    expect(getByTestId('strip-menu-link').href).toMatch(simpleProps.href);
  });

  test('should have icon rendered with props', () => {
    const { getByTestId } = render(<StripMenuButton {...simpleProps} />);

    // @ts-ignore
    expect(getByTestId('strip-menu-icon').children[0].tagName).toBe('svg');
  });
});
