import modalStyles from "./modal.module.css";
import { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ handleClose, title, children }) {
  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handleClose(event);
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return ReactDOM.createPortal(
    <>
      <div className={`p-10 ${modalStyles.modal}`}>
        <header className={modalStyles.header}>
          {title ? (
            <h1 className={`text text_type_main-large  ${modalStyles.title}`}>
              {title}
            </h1>
          ) : null}
          <CloseIcon type='primary' onClick={handleClose} />
        </header>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};
