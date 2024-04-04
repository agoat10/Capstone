// imports
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './blog.module.css';

// function for adding a new blog
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

// pop up for adding a new blog, including the X button
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