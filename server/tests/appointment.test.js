import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import Appointment from '../src/models/Appointment.js';

describe('Appointment API endpoints', () => {
  beforeAll(async () => {
    const testDbUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/dental_test';
    await mongoose.connect(testDbUri);
  });

  afterEach(async () => {
    await Appointment.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should successfully book an available time slot', async () => {
    const response = await request(app)
      .post('/api/appointments/book')
      .send({
        patientName: 'Jane Doe',
        date: '2026-05-15',
        time: '10:00',
        service: 'Cleaning',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.patientName).toBe('Jane Doe');
    expect(response.body.status).toBe('Scheduled');
  });

  it('should prevent double-booking the exact same date and time', async () => {
    // Create the first booking directly in the database
    await Appointment.create({
      patientName: 'First Patient',
      date: '2026-05-15',
      time: '14:30',
      status: 'Scheduled',
    });

    // Try to book the same slot via the API
    const response = await request(app)
      .post('/api/appointments/book')
      .send({
        patientName: 'Second Patient',
        date: '2026-05-15',
        time: '14:30',
        service: 'Root Canal',
      });

    expect(response.statusCode).toBe(409); // 409 Conflict
    expect(response.body.message).toContain('conflict');
  });
});
