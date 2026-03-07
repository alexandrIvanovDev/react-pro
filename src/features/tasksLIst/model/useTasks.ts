import { useState, useMemo, useCallback } from 'react';

import type { Task } from 'entities/task/model/types';

export type Filter = 'all' | 'completed' | 'incomplete';

export const useTasks = (initial: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'incomplete':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const removeTask = useCallback(
    (id: string) => {
      setTasks(tasks.filter((el) => el.id !== id));
    },
    [tasks],
  );

  const toggleTask = useCallback(
    (id: string, newValue: boolean) => {
      setTasks(
        tasks.map((el) => {
          if (el.id === id) {
            return { ...el, completed: newValue };
          } else {
            return el;
          }
        }),
      );
    },
    [tasks],
  );

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
    toggleTask,
  };
};
