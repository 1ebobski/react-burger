import { useEffect, useCallback } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

export default function ModalOverlay(props) {
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

  return <div className={modalOverlayStyles.overlay}>{props.children}</div>;
}
