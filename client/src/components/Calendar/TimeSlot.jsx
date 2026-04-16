import React from 'react';
import './Calendar.css';

export default function TimeSlot({ time, isSelected, isAvailable, onSelect }) {
  return (
    <button
      type="button"
      disabled={!isAvailable}
      className={`time-slot ${isSelected ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
      onClick={() => onSelect(time)}
    >
      {time}
    </button>
  );
}
