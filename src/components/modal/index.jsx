import modalStyles from "./modal.module.css";
import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "..";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ title, children, handleClose }) {
  const history = useHistory();

  const handleBack = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape") {
        if (handleClose) {
          handleClose(event);
        } else {
          handleBack(event);
        }
      }
    },
    [handleBack, handleClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return createPortal(
    <>
      <div className={`p-10 ${modalStyles.modal}`}>
        <div className={modalStyles.header}>
          {title ? (
            <h1 className={`text text_type_main-large  ${modalStyles.title}`}>
              {title}
            </h1>
          ) : null}
          <CloseIcon
            type='primary'
            onClick={handleClose ? handleClose : handleBack}
          />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={handleClose ? handleClose : handleBack} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};
