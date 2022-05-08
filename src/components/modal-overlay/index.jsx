import modalOverlayStyles from "./modal-overlay.module.css";
import { memo } from "react";
import PropTypes from "prop-types";

function ModalOverlay({ onClick }) {
  return <div onClick={onClick} className={modalOverlayStyles.overlay}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default memo(ModalOverlay);
