import { useState, useMemo, useCallback, useEffect } from 'react';

import type { Task } from '../model/types';
import { useGetTasksQuery } from '../api/tasksApi';

export type Filter = 'all' | 'completed' | 'incomplete';

export const useTasks = () => {
  const { data } = useGetTasksQuery();

  const [tasks, setTasks] = useState<Task[]>(data ?? []);
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

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((el) => el.id !== id));
  }, []);

  const toggleTask = useCallback((id: number, newValue: boolean) => {
    setTasks((prev) =>
      prev.map((el) => (el.id === id ? { ...el, completed: newValue } : el)),
    );
  }, []);

  useEffect(() => {
    if (data) {
      console.log('render');

      setTasks(data ?? []);
    }
  }, [data]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
    toggleTask,
  };
};
