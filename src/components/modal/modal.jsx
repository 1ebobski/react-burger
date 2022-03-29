import { useRef } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";

export default function Modal(props) {
  const wrapperRef = useRef(null);
  props.useOutsideAlerter(wrapperRef, props.handleClose);
  return (
    <div
      className={`${props.type === "ingredient" ? "pb-15" : "pb-30"} ${
        modalStyles.modal
      }`}
      ref={wrapperRef}>
      {props.type === "ingredient" ? (
        <h1 className={`text text_type_main-large  ${modalStyles.header}`}>
          Детали ингредиента
        </h1>
      ) : null}
      <div className={modalStyles.close} onClick={props.handleClose}>
        <CloseIcon type='primary' />
      </div>
      <div className={modalStyles.container}>{props.children}</div>
    </div>
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  useOutsideAlerter: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
