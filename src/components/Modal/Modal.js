import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

function Modal({ onCloseModal, imgModal }) {
  //    снимаем слушатель и handleKeyDown()
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  return (
    <div className={s.overlay} onClick={onCloseModal}>
      <div className={s.modal}>
        <img src={imgModal.img} alt={imgModal.alt} className={s.modalImage} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  imgModal: PropTypes.object.isRequired,
};

export default Modal;
