import type { ReactNode } from 'react';
import type { TooltipPosition } from './TooltipPosition';

export type Props = {
  children: ReactNode;
  text: string;
  position?: TooltipPosition;
  className?: string;
};
