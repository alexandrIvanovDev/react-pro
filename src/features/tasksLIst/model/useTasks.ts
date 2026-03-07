import { useState, useMemo } from 'react';

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

  const removeTask = (id: string) => {
    setTasks(tasks.filter((el) => el.id !== id));
  };

  const toggleTask = (id: string, newValue: boolean) => {
    setTasks(
      tasks.map((el) => {
        if (el.id === id) {
          return { ...el, completed: newValue };
        } else {
          return el;
        }
      }),
    );
  };

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
    toggleTask,
  };
};
