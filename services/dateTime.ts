import { Appointment } from '../types/appointment';

export const dateTimeService = {
  parseDateTime: (dateInput: string, timeInput: string): Date => {
    const [year, month, day] = dateInput.split('-').map(Number);
    const [hour, minute] = timeInput.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute);
  },

  formatAppointmentTime: (appointment: Appointment): string => {
    const startDate = new Date(appointment.startDateTime);
    const endDate = new Date(appointment.endDateTime);
    
    if (startDate.toDateString() !== endDate.toDateString()) {
      return '(multi-day)';
    }
    
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    };
    
    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  },

  getAppointmentsOfDate: (appointments: Appointment[], date: string): Appointment[] => {
    if (!date) return [];
    
    const selectedDate = new Date(date);
    return appointments.filter(appointment => {
      const startDate = new Date(appointment.startDateTime);
      const endDate = new Date(appointment.endDateTime);
      
      return (
        (startDate.toDateString() === selectedDate.toDateString()) ||
        (endDate.toDateString() === selectedDate.toDateString()) ||
        (startDate < selectedDate && endDate > selectedDate)
      );
    });
  }
}; 