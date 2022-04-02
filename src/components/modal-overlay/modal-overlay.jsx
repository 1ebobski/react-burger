import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay(props) {
  return (
    <div
      onClick={props.handleModalClose}
      className={modalOverlayStyles.overlay}></div>
  );
}

ModalOverlay.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
};
