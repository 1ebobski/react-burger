import modalOverlayStyles from "./modal-overlay.module.css";

export default function ModalOverlay(props) {
  return (
    <div
      onClick={props.handleClose}
      className={modalOverlayStyles.overlay}></div>
  );
}
