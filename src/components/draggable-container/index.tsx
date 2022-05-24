import draggableContainerStyles from "./draggable-container.module.css";
import { useRef } from "react";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import { IDraggableContainer } from "../../types";

export default function DraggableContainer({
  id,
  index,
  moveComponent,
  children,
}: IDraggableContainer) {
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: DropTargetMonitor): void {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => {
      return { id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity: number = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li
      className={`mb-4 ${draggableContainerStyles.container}`}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}>
      {children}
    </li>
  );
}
