import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Spinner from '../../components/UI/Spinner';
import './Staff.css';

export default function PatientDirectory() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Hypothetical endpoint fetching the clinic's user base
        const response = await api.get('/staff/patients');
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to load directory", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Simple client-side filtering based on the search bar
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="directory-container">
      <header className="directory-header">
        <h2>Patient Directory</h2>
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </header>

      {loading ? (
        <Spinner />
      ) : (
        <table className="directory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone || 'N/A'}</td>
                  <td>{patient.lastVisit || 'No history'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
