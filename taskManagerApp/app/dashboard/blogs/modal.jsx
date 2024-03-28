import React from 'react';
import ReactDOM from 'react-dom';
import styles from './blog.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;