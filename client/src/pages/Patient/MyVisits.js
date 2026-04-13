import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/appointments';
import Spinner from '../../components/UI/Spinner';

export default function MyVisits() {
  const [visits, setVisits] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this endpoint would know who the user is via their auth token
    const fetchMyVisits = async () => {
      try {
        const data = await appointmentService.getPatientVisits();
        setVisits(data);
      } catch (error) {
        console.error("Failed to fetch visits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVisits();
  }, []);

  if (loading) return <Spinner text="Loading your appointments..." />;

  return (
    <div className="my-visits-container">
      <h2>My Appointments</h2>
      
      <section className="visit-section">
        <h3>Upcoming</h3>
        {visits.upcoming.length === 0 ? (
          <p>You have no upcoming appointments.</p>
        ) : (
          <ul className="visit-list">
            {visits.upcoming.map(visit => (
              <li key={visit.id} className="visit-card">
                <strong>{visit.date} at {visit.time}</strong>
                <span>{visit.service}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="visit-section">
        <h3>Past Visits</h3>
        {visits.past.length === 0 ? (
          <p>No previous visit history found.</p>
        ) : (
          <ul className="visit-list past-visits">
            {visits.past.map(visit => (
              <li key={visit.id} className="visit-card">
                <strong>{visit.date}</strong> - {visit.service}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
