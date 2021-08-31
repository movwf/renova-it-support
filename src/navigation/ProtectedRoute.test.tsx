import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import '@testing-library/jest-dom';

import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';

const Home = () => {
  const history = useHistory();
  const navigate = () => {
    history.replace('/protected');
  };

  return (
    <div data-testid="home">
      Home
      <button type="button" data-testid="button" onClick={() => navigate()}>
        Click
      </button>
    </div>
  );
};
const ProtectedTest = () => <div data-testid="protected-test">Protected</div>;

const RouteComponent = () => (
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/protected" component={ProtectedTest} />
      </Switch>
    </BrowserRouter>
  </AuthProvider>
);

describe('Protected Route', () => {
  test('should return to home route if not authenticated', async () => {
    render(<RouteComponent />);

    const button = screen.getByTestId('button');

    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(window.localStorage.getItem('isAuthenticated')).not.toBe('true');
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  test('should return to home route if authenticated', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    render(<RouteComponent />);

    const button = screen.getByTestId('button');

    fireEvent.click(button);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(window.localStorage.getItem('isAuthenticated')).toBe('true');
    expect(screen.getByTestId('protected-test')).toBeInTheDocument();
  });
});
