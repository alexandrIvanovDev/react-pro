import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from 'shared/lib/classNames';

import cl from './Tooltip.module.css';
import type { Props } from './types';

export const Tooltip = ({ children, text, position = 'top', className = '' }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateCoords = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 4;

    let top = 0,
      left = 0;
    const centerH = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    const centerV = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap;
        left = centerH;
        break;
      case 'bottom':
        top = triggerRect.bottom + gap;
        left = centerH;
        break;
      case 'left':
        top = centerV;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = centerV;
        left = triggerRect.right + gap;
        break;
    }

    left = Math.max(4, Math.min(left, window.innerWidth - tooltipRect.width - 4));
    top = Math.max(4, Math.min(top, window.innerHeight - tooltipRect.height - 4));

    setCoords({ top, left });
  }, [position]);

  useEffect(() => {
    if (!isVisible) return;

    updateCoords();
  }, [updateCoords, isVisible]);

  const onMouseEnter = () => {
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  };

  const portalRoot = document.getElementById('tooltip-root');

  if (!portalRoot) return <>{children}</>;

  return (
    <>
      <div ref={triggerRef} onMouseEnter={onMouseEnter} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={classNames(cl.tooltip, [className])}
            style={{
              top: coords.top,
              left: coords.left,
              position: 'absolute',
            }}
          >
            {text}
          </div>,
          portalRoot,
        )}
    </>
  );
};
