import React from 'react';

type Key = string;
type InitValue = string | number | any;

export default function useLocalStorage(key: Key, initialValue: InitValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState(() => {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: any) => {
    // Save state
    setStoredValue(value);
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
}
