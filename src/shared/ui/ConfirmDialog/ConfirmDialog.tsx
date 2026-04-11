import { createPortal } from 'react-dom';

import cl from './ConfirmDialog.module.css';

export type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({ title, description, onConfirm, onCancel }: Props) =>
  createPortal(
    <div className={cl.overlay} onClick={onCancel}>
      <div className={cl.dialog} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <span>{description}</span>
        <div className={cl.buttons}>
          <button className={cl.btn} onClick={onCancel}>
            Отмена
          </button>
          <button className={cl.btn} onClick={onConfirm}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
