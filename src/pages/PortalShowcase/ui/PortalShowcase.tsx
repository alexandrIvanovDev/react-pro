import { useConfirmDialog } from 'shared/ui/ConfirmDialog/useConfirmDialog';
import { Tooltip } from 'shared/ui/Tooltip/Tooltip';

export const PortalShowcase = () => {
  const { ConfirmDialog, showConfirmDialog } = useConfirmDialog();

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: 'Это действие необратимо.',
    });

    if (confirmed) {
      console.log('delete');
    } else {
      console.log('cancel');
    }
  };

  return (
    <>
      <div style={{ width: 'max-content' }}>
        <Tooltip text='tooltipButton'>
          <button onClick={handleDelete}>Удалить</button>
        </Tooltip>
      </div>
      <ConfirmDialog />
    </>
  );
};
