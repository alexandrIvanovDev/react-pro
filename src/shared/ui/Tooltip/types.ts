import type { ReactNode } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';

export type Props = {
  children: ReactNode;
  text: string;
  position?: Position;
  className?: string;
};
