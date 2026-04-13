import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js'; // Ensure you export 'app' from server.js for testing
import User from '../src/models/User.js';

describe('Authentication API endpoints', () => {
  // Connect to a test database before running tests
  beforeAll(async () => {
    const testDbUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/dental_test';
    await mongoose.connect(testDbUri);
  });

  // Clean up the database after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Disconnect after all tests are done
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Patient',
        email: 'test@clinic.com',
        password: 'securepassword123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.email).toBe('test@clinic.com');
  });

  it('should reject login with incorrect password', async () => {
    // First create a user
    await User.create({
      name: 'Test Patient',
      email: 'test@clinic.com',
      password: 'securepassword123', // Mongoose pre-save hook will hash this
    });

    // Attempt to log in with wrong password
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@clinic.com',
        password: 'wrongpassword',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
