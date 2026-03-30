import { useState, useRef, type ChangeEvent, useEffect } from 'react';

export const DebouncedLogger = () => {
  const [value, setValue] = useState('');
  const timerRef = useRef<null | number>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log('value', newValue);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return <input value={value} onChange={handleChange} />;
};
