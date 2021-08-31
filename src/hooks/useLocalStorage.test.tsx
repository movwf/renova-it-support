import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import useLocalStorage from './useLocalStorage';

describe('Hook: useLocalStorage', () => {
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

  test('should set local storage value with setter function', () => {
    const Component = () => {
      const [test, setTest] = useLocalStorage('test', false);

      React.useEffect(() => {
        setTest(!test);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return <>Test</>;
    };

    render(<Component />);

    expect(window.localStorage.getItem('test')).toBe('true');
  });

  test('should set local storage default value by calling', () => {
    const initialStateValue = 'Test';

    const Component = () => {
      const [testValue] = useLocalStorage('test', initialStateValue);

      return <span data-testid="ls-default">{testValue}</span>;
    };

    const spy = jest.spyOn(React, 'useState');
    spy.mockReturnValue([initialStateValue, () => {}]);

    const { getByTestId } = render(<Component />);

    expect(getByTestId('ls-default').innerHTML).toBe('Test');
  });
});
