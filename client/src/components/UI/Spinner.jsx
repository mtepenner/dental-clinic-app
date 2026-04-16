import React from 'react';
import './UI.css';

export default function Spinner({ size = 'medium', text = 'Loading...' }) {
  return (
    <div className={`spinner-container spinner-${size}`}>
      <div className="spinner"></div>
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );
}
