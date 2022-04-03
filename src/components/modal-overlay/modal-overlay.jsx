import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ handleClose }) {
  return (
    <div onClick={handleClose} className={modalOverlayStyles.overlay}></div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
