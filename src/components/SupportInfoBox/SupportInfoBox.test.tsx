import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SupportInfoBox from './index';
import { ISupportInfoBox } from '../../types/components/SupportInfoBox.types';

describe('SupportInfoBox Component', () => {
  // Inital props
  const simpleProps: ISupportInfoBox = {
    title: 'Test Title',
    desc: 'Test Description',
    links: [
      {
        title: 'Test Link',
        url: '#',
      },
    ],
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<SupportInfoBox {...simpleProps} />);

    expect(getByTestId('support-info-box')).toBeInTheDocument();
  });

  test('should have title set with props', () => {
    const { getByTestId } = render(<SupportInfoBox {...simpleProps} />);

    expect(getByTestId('support-info-box-title').innerHTML).toBe(simpleProps.title);
  });

  test('should have description set with props', () => {
    const { getByTestId } = render(<SupportInfoBox {...simpleProps} />);

    expect(getByTestId('support-info-box-desc').innerHTML).toBe(simpleProps.desc);
  });

  test('should have a link title and href set with props', () => {
    const { getByTestId } = render(<SupportInfoBox {...simpleProps} />);
    const linkIndex = 0;

    expect(getByTestId(`support-info-box-link-${linkIndex}`).innerHTML).toBe(
      simpleProps.links[0].title
    );
    // @ts-ignore
    expect(getByTestId(`support-info-box-link-${linkIndex}`).href).toMatch(
      simpleProps.links[0].url
    );
  });

  test("should have link count as links prop's count", () => {
    const { getByTestId } = render(<SupportInfoBox {...simpleProps} />);

    // eslint-disable-next-line prefer-destructuring
    const children = getByTestId('support-info-box').children;
    const linkCount = Array.from(children).filter((child) => child.tagName === 'A').length;

    expect(linkCount).toBe(simpleProps.links.length);
  });
});
