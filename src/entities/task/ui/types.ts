import type { Task } from '../model/types';

export type Props = Task & {
  className?: string;
  changeCompleted: (id: string, value: boolean) => void;
  removeTask: (id: string) => void;
};
