import { Select } from 'antd';

import { TaskCard } from 'entities/task';

import { useTasks } from '../model/useTasks';
import { useGetTasksQuery } from '../api/tasksApi';

export const TasksList = () => {
  const { isLoading } = useGetTasksQuery();

  const { tasks, filter, removeTask, setFilter, toggleTask } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Select
        style={{ width: '300px' }}
        value={filter}
        onChange={(value) => setFilter(value)}
        options={[
          { value: 'all', label: 'Все' },
          { value: 'completed', label: 'Выполненные' },
          { value: 'incomplete', label: 'Невыполненные' },
        ]}
      />

      {tasks.map((el) => (
        <TaskCard
          key={el.id}
          id={el.id}
          title={el.title}
          completed={el.completed}
          changeCompleted={toggleTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};
