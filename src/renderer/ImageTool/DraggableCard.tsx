import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { Image } from '../types';

export type DraggableCardProps = {
  id: number;
  image: Image;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
};

type DragItem = {
  image: Image;
  index: number;
};

export default function DraggableCard(props: DraggableCardProps) {
  const { image, onMove, index, id } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'draggablecard',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current || !item.image) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'draggablecard',
    item: () => {
      return { id, index, image };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="h-[100px] flex items-center justify-center relative cursor-move bg-white border border-gray border-dashed m-1 p-2"
    >
      <span className="absolute -top-4 -left-3 text-lg font-bold">
        {index + 1}
      </span>
      {image.file && image.file.url && (
        <img
          className="w-[100px]"
          src={image.file.url}
          alt={index.toString()}
        />
      )}
    </div>
  );
}
