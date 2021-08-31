/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import LeftDrawerMenu from './index';

const original = ReactDOM.createPortal;

describe('LeftDrawerMenu Component', () => {
  test('should be rendered', () => {
    ReactDOM.createPortal = original;
    const appWrapper = document.createElement('div');
    appWrapper.setAttribute('id', 'portal-node');
    appWrapper.setAttribute('data-testid', 'portal-test');
    appWrapper.append(document.createTextNode('Test'));

    document.body.append(appWrapper);

    render(<LeftDrawerMenu isSideNavExpanded={true} />);

    expect(screen.getByTestId('left-drawer')).toBeInTheDocument();
  });
});
