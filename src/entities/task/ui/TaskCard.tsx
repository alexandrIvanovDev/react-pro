import { memo } from 'react';
import { Button, Checkbox } from 'antd';

import { classNames } from 'shared/lib/classNames';

import s from './TaskCard.module.css';
import type { Props } from './types';

export const TaskCard = memo(
  ({ changeCompleted, completed, title, id, className, removeTask }: Props) => (
    <div className={classNames(s.task, [className])}>
      <Checkbox
        checked={completed}
        onChange={(e) => changeCompleted(id, e.target.checked)}
      >
        {title}
      </Checkbox>
      <Button onClick={() => removeTask(id)}>Удалить</Button>
    </div>
  ),
);
