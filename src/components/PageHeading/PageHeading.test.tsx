import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageHeading from './index';
import { IPageHeading } from '../../types/components/PageHeading.types';

describe('PageHeading Component', () => {
  // Inital props
  const simpleProps: IPageHeading = {
    title: 'Title',
    desc: 'Description',
  };

  test('should be rendered', () => {
    const { getByTestId } = render(<PageHeading {...simpleProps} />);

    expect(getByTestId('page-heading')).toBeInTheDocument();
  });

  test('should have title set with props', () => {
    const { getByTestId } = render(<PageHeading {...simpleProps} />);

    expect(getByTestId('page-heading-title').innerHTML).toBe(simpleProps.title);
  });

  test('should have desc set with props', () => {
    const { getByTestId } = render(<PageHeading {...simpleProps} />);

    expect(getByTestId('page-heading-desc').innerHTML).toBe(simpleProps.desc);
  });

  test('should have only rendered with title', () => {
    const updatedProps = { title: 'Test' };
    const { getByTestId, queryByTestId } = render(<PageHeading {...updatedProps} />);

    expect(getByTestId('page-heading-title').innerHTML).toBe(updatedProps.title);
    // @ts-ignore
    expect(queryByTestId('span', 'page-heading-desc')).not.toBeInTheDocument();
  });
});
