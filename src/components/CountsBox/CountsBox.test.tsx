import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import CountsBox from './index';
import { ICountsBox } from '../../types/components/CountsBox.types';

describe('CountsBox Component', () => {
  // Inital props
  const simpleProps: ICountsBox = {
    title: 'Test',
    count: 10,
    width: '100px',
    height: '100px',
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<CountsBox {...simpleProps} />);

    expect(getByTestId('counts-box')).toBeInTheDocument();
  });

  test('should have title set with props', () => {
    const { getByTestId } = render(<CountsBox {...simpleProps} />);

    expect(getByTestId('counts-box-title').innerHTML).toBe(simpleProps.title);
  });

  test('should have count set with props', () => {
    const { getByTestId } = render(<CountsBox {...simpleProps} />);

    expect(getByTestId('counts-box-count').innerHTML).toBe(simpleProps.count.toString());
  });

  test('should have height and width set with props', () => {
    const { getByTestId } = render(<CountsBox {...simpleProps} />);

    expect(getByTestId('counts-box').style.height).toBe(simpleProps.height);
    expect(getByTestId('counts-box').style.width).toBe(simpleProps.width);
  });
});
