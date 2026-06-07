import { useState, useEffect } from 'react';

/**
 * Debounces a value by the given delay.
 * Useful for delaying search input to reduce API calls.
 * @param {*} value - The value to debounce
 * @param {number} [delay=500] - Delay in milliseconds
 * @returns {*} The debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
