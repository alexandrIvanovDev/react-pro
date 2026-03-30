import { useRef, type FocusEvent } from 'react';

import cl from './FocusTracker.module.css';

export const FocusTracker = () => {
  const firstRef = useRef<HTMLInputElement | null>(null);
  const secondRef = useRef<HTMLInputElement | null>(null);

  const focusCountRef = useRef(0);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      focusCountRef.current += 1;
      console.log('count', focusCountRef.current);
    }
  };

  const handleFocusFirstClick = () => {
    if (firstRef.current) {
      firstRef.current.focus();
    }
  };

  return (
    <div className={cl.wrapper}>
      <input ref={firstRef} onFocus={handleFocus} autoFocus />

      <input ref={secondRef} onFocus={handleFocus} />

      <button onClick={handleFocusFirstClick}>Сфокусировать на первом</button>
    </div>
  );
};
