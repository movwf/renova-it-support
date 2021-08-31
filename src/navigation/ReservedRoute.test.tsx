import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Link, MemoryRouter, Route, Switch } from 'react-router-dom';
import '@testing-library/jest-dom';

import { AuthProvider } from '../contexts/AuthContext';
import ReservedRoute from './ReservedRoute';

const Home = () => (
  <div data-testid="home">
    Home
    <Link data-testid="link" to={{ pathname: '/reserved', state: { prevPath: '/' } }} />
    <Link data-testid="link-to-test" to="/test" />
  </div>
);

const Test = () => (
  <div data-testid="test-route">
    Test
    <Link
      data-testid="link-to-reserved"
      to={{ pathname: '/reserved', state: { prevPath: '/test' } }}
    />
  </div>
);

const Reserved = () => <div data-testid="reserved-test">Reserved</div>;

const RouteComponent = ({ reservedRoutes }: any) => (
  <AuthProvider>
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/test" component={Test} />
        <ReservedRoute
          exact
          path="/reserved"
          reservedRoutes={reservedRoutes}
          redirect="/"
          component={Reserved}
        />
      </Switch>
    </MemoryRouter>
  </AuthProvider>
);

describe('Reserved Route', () => {
  test('should proceed to reserved route if navigated from home path', async () => {
    render(<RouteComponent reservedRoutes={['/']} />);

    const link = screen.getByTestId('link');

    fireEvent.click(link);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('reserved-test')).toBeInTheDocument();
  });

  test('should not proceed to reserved route if reservedRoutes are not set', async () => {
    render(<RouteComponent />);

    // From home

    const link = screen.getByTestId('link');

    fireEvent.click(link);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.queryByTestId('reserved-test')).toBeNull();

    // From test page

    const linkToTest = screen.getByTestId('link-to-test');

    fireEvent.click(linkToTest);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const linkToReserved = screen.getByTestId('link-to-reserved');

    fireEvent.click(linkToReserved);

    expect(screen.queryByTestId('reserved-test')).toBeNull();
  });

  test('should redirect to home path if navigated from non-permitted path', async () => {
    render(<RouteComponent reservedRoutes={['/']} />);

    const linkToTest = screen.getByTestId('link-to-test');

    fireEvent.click(linkToTest);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    const link = screen.getByTestId('link-to-reserved');

    fireEvent.click(link);

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
