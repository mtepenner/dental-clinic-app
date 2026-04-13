import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { appointmentService } from '../../services/appointments';

export default function Dashboard() {
  // Default to today's date
  const [viewDate, setViewDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, [viewDate]);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      // Fetching from a hypothetical endpoint: /api/appointments/daily?date=YYYY-MM-DD
      const data = await appointmentService.getDailySchedule(viewDate);
      setSchedule(data.appointments);
    } catch (error) {
      console.error("Failed to load schedule", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!isConfirmed) return;

    try {
      await appointmentService.cancelAppointment(appointmentId);
      // Refresh the list after successful cancellation
      fetchSchedule();
    } catch (error) {
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Daily Schedule</h2>
        <input 
          type="date" 
          value={viewDate} 
          onChange={(e) => setViewDate(e.target.value)} 
        />
      </header>

      {loading ? (
        <p>Loading schedule...</p>
      ) : schedule.length === 0 ? (
        <p>No appointments scheduled for this date.</p>
      ) : (
        <div className="appointment-list">
          {schedule.map((apt) => (
            <div key={apt.id} className={`appointment-card status-${apt.status.toLowerCase()}`}>
              <div className="apt-time">{apt.time}</div>
              <div className="apt-details">
                <h3>{apt.patientName}</h3>
                <p>{apt.service}</p>
              </div>
              <div className="apt-actions">
                {apt.status !== 'Canceled' && (
                  <button 
                    className="btn-danger" 
                    onClick={() => handleCancel(apt.id)}
                  >
                    Cancel
                  </button>
                )}
                <span className="status-badge">{apt.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
