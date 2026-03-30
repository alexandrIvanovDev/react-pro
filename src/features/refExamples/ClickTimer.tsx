import { useRef } from 'react';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer = () => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const refData = clickDataRef.current;

    if (!refData.startTime) {
      refData.startTime = Date.now();
    } else {
      const timeDiff = Date.now() - refData.startTime;
      console.log(`Разница между кликами ${timeDiff} мс`);
    }

    refData.clickCount += 1;
    console.log('clickCount', refData.clickCount);
  };

  return <button onClick={handleClick}>Click</button>;
};
