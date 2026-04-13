import { format, parseISO, isPast } from 'date-fns';

export const dateUtils = {
  /**
   * Formats a database ISO string into a readable format for the UI.
   * Example output: "Mon, Apr 13, 2026"
   */
  toReadableDate: (isoString) => {
    if (!isoString) return '';
    const date = parseISO(isoString);
    return format(date, 'E, MMM d, yyyy');
  },

  /**
   * Formats a time string (e.g., "14:30") to AM/PM.
   * Example output: "2:30 PM"
   */
  toAmPm: (timeString) => {
    if (!timeString) return '';
    // Create a dummy date just to parse the time
    const dummyDate = new Date(`2000-01-01T${timeString}`);
    return format(dummyDate, 'h:mm a');
  },

  /**
   * Checks if a given date string is in the past, useful for disabling
   * cancellation buttons for old appointments.
   */
  isAppointmentPast: (dateString, timeString) => {
    const aptDateTime = new Date(`${dateString}T${timeString}`);
    return isPast(aptDateTime);
  }
};
