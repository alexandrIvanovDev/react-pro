import { useState, useCallback, useRef } from 'react';

import { ConfirmDialog } from './ConfirmDialog';

interface ConfirmOptions {
  title: string;
  description: string;
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ConfirmOptions | null>(null);

  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const showConfirmDialog = useCallback((state: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState(state);
      setIsOpen(true);
    });
  }, []);

  const handleClose = (result: boolean) => {
    setIsOpen(false);

    resolveRef.current?.(result);
    resolveRef.current = null;
  };

  const ConfirmComponent = () => {
    if (!isOpen || !state) return null;

    return (
      <ConfirmDialog
        title={state.title}
        description={state.description}
        onConfirm={() => handleClose(true)}
        onCancel={() => handleClose(false)}
      />
    );
  };

  return { showConfirmDialog, ConfirmDialog: ConfirmComponent };
};
