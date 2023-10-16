import { useEffect, useState } from 'react';

interface debouncedResult<T> {
  debouncedValue: T;
}

const useDebounce = <T>(value: T, delay: number = 1000): debouncedResult<T> => {
  const [debouncedValue, setdebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return { debouncedValue };
};

export default useDebounce;
