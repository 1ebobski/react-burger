import ReactDOM from "react-dom";
import { useRef } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";

const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      props.handleClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  return ReactDOM.createPortal(
    <div className={`p-10 ${modalStyles.modal}`}>
      <header className={modalStyles.header}>
        {props.type === "ingredient" ? (
          <h1 className={`text text_type_main-large  ${modalStyles.title}`}>
            {props.type === "ingredient" ? "Детали ингредиента" : null}
          </h1>
        ) : null}

        <CloseIcon type='primary' onClick={props.handleClose} />
      </header>
      {props.children}
      <ModalOverlay handleClose={props.handleClose} />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
