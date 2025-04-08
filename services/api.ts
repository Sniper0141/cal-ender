import { Appointment } from '../types/appointment';

const API_URL = 'https://cal-ender-backend.vercel.app/api/appointments';

export const appointmentApi = {
  fetchAppointments: async (): Promise<Appointment[]> => {
    try {
      const response = await fetch(API_URL);
      return await response.json();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  },

  createAppointment: async (appointment: Omit<Appointment, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      return response.ok;
    } catch (error) {
      console.error('Error creating appointment:', error);
      return false;
    }
  }
}; 