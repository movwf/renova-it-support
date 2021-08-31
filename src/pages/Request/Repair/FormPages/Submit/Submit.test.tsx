import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';

import Submit from './index';

describe('Submit Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be rendered', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Submit />
      </Router>
    );

    expect(screen.getByTestId('submit-page')).toBeInTheDocument();
  });

  test('should let you copy the request id with copy button', () => {
    // @ts-ignore
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    const clipboardSpy = jest.spyOn(navigator.clipboard, 'writeText');
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Submit />
      </Router>
    );

    const button = screen.getByTestId('submit-copy-button');

    fireEvent.click(button);

    expect(clipboardSpy).toBeCalled();
  });

  test('should get placeholder request id if location state is empty', () => {
    const requestId = '1234-5678-01';
    const history = createMemoryHistory();
    const state = {
      request_id: requestId,
    };

    history.push('/', state);

    render(
      <Router history={history}>
        <Submit />
      </Router>
    );

    expect(screen.getByTestId('request-id-text').innerHTML).toBe(requestId);
  });
});
