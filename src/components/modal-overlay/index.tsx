import modalOverlayStyles from "./modal-overlay.module.css";
import { memo, SyntheticEvent } from "react";

function ModalOverlay({
  onClick,
}: {
  onClick: (e: SyntheticEvent) => void;
}): JSX.Element {
  return <div onClick={onClick} className={modalOverlayStyles.overlay}></div>;
}

export default memo(ModalOverlay);
