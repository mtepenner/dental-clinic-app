import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    date: {
      type: String, // Stored as YYYY-MM-DD for easy querying
      required: [true, 'Appointment date is required'],
    },
    time: {
      type: String, // e.g., "09:00", "14:30"
      required: [true, 'Appointment time is required'],
    },
    service: {
      type: String,
      default: 'General Checkup',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Canceled'],
      default: 'Scheduled',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Prevent double-bookings at the database level
appointmentSchema.index({ date: 1, time: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'Scheduled' } });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
