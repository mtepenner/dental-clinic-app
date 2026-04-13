import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { appointmentService } from '../../services/appointments';

export default function BookVisit() {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // When the user picks a new date, fetch the available times from the backend
  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      appointmentService.getAvailableSlots(selectedDate)
        .then(data => setAvailableSlots(data.slots))
        .catch(() => setMessage({ type: 'error', text: 'Failed to load times.' }))
        .finally(() => setLoading(false));
    }
  }, [selectedDate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await appointmentService.bookAppointment({
        patientName,
        date: selectedDate,
        time: selectedTime,
        service: 'General Checkup' // Hardcoded for this example
      });
      setMessage({ type: 'success', text: 'Appointment booked successfully!' });
      // Reset form
      setSelectedTime('');
      setPatientName('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to book appointment.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>Book a Dental Visit</h2>
      
      {message && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            required
            value={patientName} 
            onChange={(e) => setPatientName(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Select Date</label>
          {/* HTML5 date picker for simplicity */}
          <input 
            type="date" 
            required
            min={format(new Date(), 'yyyy-MM-dd')}
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        </div>

        {selectedDate && (
          <div className="form-group">
            <label>Available Times</label>
            {loading ? (
              <p>Loading times...</p>
            ) : availableSlots.length > 0 ? (
              <select 
                required
                value={selectedTime} 
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="" disabled>Select a time</option>
                {availableSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            ) : (
              <p>No available slots for this date.</p>
            )}
          </div>
        )}

        <button type="submit" disabled={!selectedTime || !patientName || loading}>
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}
