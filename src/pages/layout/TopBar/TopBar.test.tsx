import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';

import TopBar from './index';
import Login from '../../Login';
import Routes from '../../../navigation/Routes';
import { AuthProvider } from '../../../contexts/AuthContext';

describe('Footer', () => {
  test('should be rendered', () => {
    const { getByTestId } = render(<TopBar />);

    expect(getByTestId('top-bar')).toBeInTheDocument();
  });

  test('should redirect to login page when bar login button clicked', async () => {
    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <MockedProvider>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={TopBar} />
              <Route exact path={Routes.login} component={Login} />
            </Switch>
          </Router>
        </MockedProvider>
      </AuthProvider>
    );

    const button = screen.getByTestId('topbar-login-button');
    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
