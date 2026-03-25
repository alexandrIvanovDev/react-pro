import { useEffect, useRef, useState } from 'react';

import cl from './PreviousInput.module.css';

export const PreviousInput = () => {
  const [currentValue, setCurrentValue] = useState('');

  const prevValueRef = useRef('');

  useEffect(() => {
    prevValueRef.current = currentValue;
  }, [currentValue]);

  return (
    <div className={cl.wrapper}>
      <input value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
      <span className={cl.prev}>Предыдущее значение: {prevValueRef?.current ?? ''}</span>
    </div>
  );
};
