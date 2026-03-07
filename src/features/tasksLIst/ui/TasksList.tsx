import { Select } from 'antd';

import { TaskCard } from 'entities/task/ui/TaskCard';

import { useTasks } from '../model/useTasks';

export const TasksList = () => {
  const { tasks, filter, removeTask, setFilter, toggleTask } = useTasks([
    { id: '1', title: 'first', completed: true },
    { id: '2', title: 'second', completed: false },
    { id: '3', title: 'third', completed: true },
    { id: '4', title: 'fourth', completed: false },
    { id: '5', title: 'fifth', completed: true },
  ]);

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
