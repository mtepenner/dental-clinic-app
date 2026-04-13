import React from 'react';
import Button from './Button';
import './UI.css';

export default function Modal({ isOpen, onClose, title, children, onConfirm, confirmText = "Confirm" }) {
  if (!isOpen) return null;

  // Close modal if user clicks outside the content box
  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <header className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </header>
        <div className="modal-body">
          {children}
        </div>
        <footer className="modal-footer">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>{confirmText}</Button>
          )}
        </footer>
      </div>
    </div>
  );
}
