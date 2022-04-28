import PropTypes from "prop-types";
import draggableContainerStyles from "./draggable-container.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

export default function DraggableContainer({
  id,
  index,
  moveComponent,
  children,
}) {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li
      className={`mb-4 ${draggableContainerStyles.container}`}
      ref={ref}
      data-handler-id={handlerId}
      // style={{ opacity }}
    >
      {children}
    </li>
  );
}
DraggableContainer.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveComponent: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
