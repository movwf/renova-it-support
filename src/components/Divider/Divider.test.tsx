import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Divider from './index';
import { IDivider } from '../../types/components/Divider.types';

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return (
    result &&
    `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
  );
}

describe('Divider Component', () => {
  // Inital props
  const simpleProps: IDivider = {
    thickness: 1,
    marginY: 10,
    width: '100px',
    color: 'purple',
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<Divider {...simpleProps} />);

    expect(getByTestId('divider')).toBeInTheDocument();
  });

  test('should have thickness set with props', () => {
    const { getByTestId } = render(<Divider {...simpleProps} />);

    expect(getByTestId('divider-line').style.height).toBe(`${simpleProps.thickness}px`);
  });

  test('should have margin on Y-axis set with props', () => {
    const { getByTestId } = render(<Divider {...simpleProps} />);

    expect(getByTestId('divider-line').style.marginTop).toBe(`${simpleProps.marginY}px`);
    expect(getByTestId('divider-line').style.marginBottom).toBe(`${simpleProps.marginY}px`);
  });

  test('should have width set with props ( px )', () => {
    const { getByTestId } = render(<Divider {...simpleProps} />);

    expect(getByTestId('divider-line').style.width).toBe(simpleProps.width);
  });

  test('should have width set with props ( % )', () => {
    // Update props color value with hex code
    const updatedProps = Object.assign(simpleProps, { width: '90%' });

    const { getByTestId } = render(<Divider {...updatedProps} />);

    expect(getByTestId('divider-line').style.width).toBe(updatedProps.width);
  });

  test('should have background color set with props ( color name )', () => {
    const { getByTestId } = render(<Divider {...simpleProps} />);

    expect(getByTestId('divider-line').style.backgroundColor).toBe(simpleProps.color);
  });

  test('should have background color set with props ( hex value )', () => {
    // Update props color value with hex code
    const updatedProps = Object.assign(simpleProps, { color: '#BADA55' });

    const { getByTestId } = render(<Divider {...updatedProps} />);

    expect(getByTestId('divider-line').style.backgroundColor).toBe(hexToRgb(updatedProps.color));
  });
});
