import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isBefore, 
  startOfDay 
} from 'date-fns';
import './Calendar.css';

export default function DatePicker({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Get all days in the currently viewed month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button type="button" onClick={prevMonth}>&lt;</button>
        <h4>{format(currentMonth, 'MMMM yyyy')}</h4>
        <button type="button" onClick={nextMonth}>&gt;</button>
      </div>

      <div className="date-picker-grid">
        {/* Days of the week headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}

        {/* The actual calendar days */}
        {daysInMonth.map(day => {
          const isSelected = selectedDate && isSameDay(day, new Date(selectedDate));
          const isPast = isBefore(day, today);
          
          return (
            <button
              key={day.toString()}
              type="button"
              disabled={isPast}
              className={`day-cell ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''}`}
              onClick={() => onDateSelect(format(day, 'yyyy-MM-dd'))}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
