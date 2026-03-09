import type { Task } from '../model/types';

export type Props = Task & {
  className?: string;
  changeCompleted: (id: number, value: boolean) => void;
  removeTask: (id: number) => void;
};
