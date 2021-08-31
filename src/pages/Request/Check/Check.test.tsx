import React from 'react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Check from './index';
import Routes from '../../../navigation/Routes';

describe('Check Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be rendered', async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn(), replace: jest.fn() };

    render(
      // @ts-ignore
      <Router history={historyMock}>
        <Check />
      </Router>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('check-page')).toBeInTheDocument();
  });

  test('should submit status page with request id', async () => {
    const historyMock = {
      push: jest.fn(),
      location: { state: { prevPath: Routes.check, requestId: '1234-5678-01' } },
      listen: jest.fn(),
      replace: jest.fn(),
    };

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      // @ts-ignore
      <Router history={historyMock}>
        <Check />
      </Router>
    );

    const input = screen.getByTestId('request-id-input');

    await waitFor(() => userEvent.type(input, '1234-5678-01'));
    await waitFor(() => fireEvent.submit(input));

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(historyMock.replace).toBeCalledTimes(1);
    expect(logSpy).toBeCalledTimes(1);
  });

  test('should redirect login page when clicked login button', async () => {
    const historyMock = {
      push: jest.fn(),
      location: { state: { prevPath: Routes.check, requestId: '1234-5678-01' } },
      listen: jest.fn(),
      replace: jest.fn(),
    };

    render(
      // @ts-ignore
      <Router history={historyMock}>
        <Check />
      </Router>
    );

    const button = screen.getByTestId('redirect-to-login');

    await waitFor(() => fireEvent.click(button));

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(historyMock.replace).toBeCalledTimes(1);
  });
});
