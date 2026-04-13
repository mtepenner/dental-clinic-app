import bcrypt from 'bcrypt';

// Helper to generate hashed passwords for our mock users
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const mockUsers = [
  {
    name: 'Admin Receptionist',
    email: 'admin@brightsmile.com',
    password: hashPassword('admin123'),
    role: 'staff',
  },
  {
    name: 'Jane Patient',
    email: 'jane@example.com',
    password: hashPassword('password123'),
    role: 'patient',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: hashPassword('password123'),
    role: 'patient',
  }
];

export const getMockAppointments = () => {
  // Generate dates relative to today so the dashboard always has data
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => date.toISOString().split('T')[0];

  return [
    {
      patientName: 'Jane Patient',
      date: formatDate(today),
      time: '09:00',
      service: 'General Checkup',
      status: 'Scheduled',
    },
    {
      patientName: 'John Doe',
      date: formatDate(today),
      time: '14:30',
      service: 'Teeth Whitening',
      status: 'Scheduled',
    },
    {
      patientName: 'Jane Patient',
      date: formatDate(tomorrow),
      time: '10:00',
      service: 'Cavity Filling',
      status: 'Scheduled',
    }
  ];
};
