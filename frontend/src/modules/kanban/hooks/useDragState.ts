import { useCallback, useState } from 'react';

export function useDragState<TItem>() {
  const [draggedItem, setDraggedItem] = useState<TItem | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const startDrag = useCallback((item: TItem) => setDraggedItem(item), []);
  const enterDropTarget = useCallback((targetId: string) => setDropTargetId(targetId), []);
  const clearDrag = useCallback(() => {
    setDraggedItem(null);
    setDropTargetId(null);
  }, []);

  return {
    draggedItem,
    dropTargetId,
    isDragging: draggedItem !== null,
    startDrag,
    enterDropTarget,
    clearDrag,
  };
}
