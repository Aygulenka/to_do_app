import React from 'react';
import '../../Styles/Modal.css'; 

const Modal = ({ children, onClick }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        {children}
        <button onClick={onClick} className="modal-close-button">
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Modal;
