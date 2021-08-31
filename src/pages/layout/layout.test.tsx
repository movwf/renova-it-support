import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Layout from './index';

describe('Layout', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(
      <Layout>
        <span>Test</span>
      </Layout>
    );

    expect(getByTestId('layout')).toBeInTheDocument();
  });

  test('should wrap a children', () => {
    const { getByTestId } = render(
      <Layout>
        <span data-testid="layout-children">Test</span>
      </Layout>
    );

    expect(getByTestId('layout-children')).toBeInTheDocument();
  });
});
