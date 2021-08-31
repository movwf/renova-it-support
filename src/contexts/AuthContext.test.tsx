/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AuthContext, AuthProvider } from './AuthContext';

describe('AuthContext', () => {
  beforeAll(() => {
    class MockLocalStorage {
      constructor() {
        // @ts-ignore
        this.store = {};
      }

      clear() {
        // @ts-ignore
        this.store = {};
      }

      getItem(key: string) {
        // @ts-ignore
        return this.store[key] || null;
      }

      setItem(key: string, value: any) {
        // @ts-ignore
        this.store[key] = String(value);
      }

      removeItem(key: string) {
        // @ts-ignore
        delete this.store[key];
      }
    }

    // @ts-ignore
    global.localStorage = new MockLocalStorage();
  });

  test('should wrap a component', () => {
    const Component = () => <div data-testid="component">Test</div>;

    render(
      <AuthProvider>
        <Component />
      </AuthProvider>
    );

    expect(screen.getByTestId('component')).toBeInTheDocument();
  });

  test('login should set local storage "isAuthenticated" => true ', () => {
    const Component = () => {
      const { login } = React.useContext(AuthContext);
      const buttonRef = React.useRef();

      React.useEffect(() => {
        // @ts-ignore
        buttonRef.current.click();
      }, []);

      return (
        <>
          <button
            // @ts-ignore
            ref={buttonRef}
            type="button"
            data-testid="button"
            onClick={() => {
              login({ username: 'Tester' });
            }}
          >
            Click
          </button>
        </>
      );
    };

    render(
      <AuthProvider>
        <Component />
      </AuthProvider>
    );

    expect(window.localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('login should set local storage "username" => Tester ', () => {
    const Component = () => {
      const { login } = React.useContext(AuthContext);
      const buttonRef = React.useRef();

      React.useEffect(() => {
        // @ts-ignore
        buttonRef.current.click();
      }, []);

      return (
        <>
          <button
            // @ts-ignore
            ref={buttonRef}
            type="button"
            data-testid="button"
            onClick={() => {
              login({ username: 'Tester' });
            }}
          >
            Click
          </button>
        </>
      );
    };

    render(
      <AuthProvider>
        <Component />
      </AuthProvider>
    );

    expect(window.localStorage.getItem('client-user')).toMatch('Tester');
  });

  test('logout should set local storage "isAuthenticated" => false ', () => {
    const Component = () => {
      const { logout } = React.useContext(AuthContext);
      const buttonRef = React.useRef();

      React.useEffect(() => {
        // @ts-ignore
        buttonRef.current.click();
      }, []);

      return (
        <>
          <button
            // @ts-ignore
            ref={buttonRef}
            type="button"
            data-testid="button"
            onClick={() => {
              logout();
            }}
          >
            Click
          </button>
        </>
      );
    };

    render(
      <AuthProvider>
        <Component />
      </AuthProvider>
    );

    expect(window.localStorage.getItem('isAuthenticated')).toBe('false');
  });

  test('logout should set local storage "username" => {} ', () => {
    const Component = () => {
      const { logout } = React.useContext(AuthContext);
      const buttonRef = React.useRef();

      React.useEffect(() => {
        // @ts-ignore
        buttonRef.current.click();
      }, []);

      return (
        <>
          <button
            // @ts-ignore
            ref={buttonRef}
            type="button"
            data-testid="button"
            onClick={() => {
              logout();
            }}
          >
            Click
          </button>
        </>
      );
    };

    render(
      <AuthProvider>
        <Component />
      </AuthProvider>
    );

    expect(window.localStorage.getItem('client-user')).toBe('{}');
  });
});
