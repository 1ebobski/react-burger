import modalOverlayStyles from "./modal-overlay.module.css";
import { memo } from "react";
import PropTypes from "prop-types";

function ModalOverlay({ handleClose }) {
  return (
    <div onClick={handleClose} className={modalOverlayStyles.overlay}></div>
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default memo(ModalOverlay);
