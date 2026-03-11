import { useState, useCallback, useEffect, useRef, useMemo } from 'react';

import type { Filter, Task } from '../model/types';
import { useGetTasksQuery } from '../api/tasksApi';

export const useTasks = () => {
  const { data } = useGetTasksQuery();

  const [tasks, setTasks] = useState<Task[]>(data ?? []);
  const [filter, setFilter] = useState<Filter>('all');

  const mounted = useRef(false);

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter((el) => el.completed);
    }
    if (filter === 'incomplete') {
      return tasks.filter((el) => !el.completed);
    }
    return tasks;
  }, [filter, tasks]);

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((el) => el.id !== id));
  }, []);

  const toggleTask = useCallback((id: number, newValue: boolean) => {
    setTasks((prev) => prev.map((el) => (el.id === id ? { ...el, completed: newValue } : el)));
  }, []);

  useEffect(() => {
    if (!mounted.current && !!data?.length) {
      setTasks(data ?? []);
      mounted.current = true;
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
