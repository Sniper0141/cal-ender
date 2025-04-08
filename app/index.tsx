import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { Appointment } from '../types/appointment';
import { appointmentApi } from '../services/api';
import { dateTimeService } from '../services/dateTime';

// Types
interface CalendarDay {
  dateString: string;
}

// Constants
const API_URL = 'https://cal-ender-backend.vercel.app/api/appointments';

// Main component
export default function Index() {
  // State
  const [selectedDay, setSelectedDay] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isWholeDay, setIsWholeDay] = useState(false);
  const [title, setTitle] = useState('');
  const [startDateInput, setStartDateInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');

  // Effects
  useEffect(() => {
    fetchAppointments();
  }, []);

  // API functions
  const fetchAppointments = async () => {
    const data = await appointmentApi.fetchAppointments();
    setAppointments(data);
  };

  const handleSave = async () => {
    let startDateTime: Date;
    let endDateTime: Date;

    if (isWholeDay) {
      const { start, end } = dateTimeService.parseWholeDay(startDateInput);
      startDateTime = start;
      endDateTime = end;
    } else {
      startDateTime = dateTimeService.parseDateTime(startDateInput, startTimeInput);
      endDateTime = dateTimeService.parseDateTime(endDateInput, endTimeInput);
    }

    const success = await appointmentApi.createAppointment({
      title,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
    });

    if (success) {
      resetForm();
      fetchAppointments();
    }
  };

  // Helper functions
  const resetForm = () => {
    setShowModal(false);
    setTitle('');
    setIsWholeDay(false);
    setStartDateInput('');
    setStartTimeInput('');
    setEndDateInput('');
    setEndTimeInput('');
  };

  const getAppointmentsOfDate = (date: string) => {
    return dateTimeService.getAppointmentsOfDate(appointments, date);
  };

  const formatAppointmentTime = (appointment: Appointment) => {
    return dateTimeService.formatAppointmentTime(appointment);
  };

  // Render functions
  const renderAppointmentForm = () => (
    <ScrollView>
      <Text style={styles.modalTitle}>New Appointment</Text>
      
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter appointment title"
        placeholderTextColor="#666"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Whole Day</Text>
        <Switch
          value={isWholeDay}
          onValueChange={setIsWholeDay}
        />
      </View>

      {isWholeDay ? (
        <>
          <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={startDateInput}
            onChangeText={setStartDateInput}
            placeholder="2024-04-08"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Start Time (HH:MM)</Text>
          <TextInput
            style={styles.input}
            value={startTimeInput}
            onChangeText={setStartTimeInput}
            placeholder="10:00"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>End Time (HH:MM)</Text>
          <TextInput
            style={styles.input}
            value={endTimeInput}
            onChangeText={setEndTimeInput}
            placeholder="11:00"
            placeholderTextColor="#666"
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Start Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={startDateInput}
            onChangeText={setStartDateInput}
            placeholder="2024-04-08"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Start Time (HH:MM)</Text>
          <TextInput
            style={styles.input}
            value={startTimeInput}
            onChangeText={setStartTimeInput}
            placeholder="10:00"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>End Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={endDateInput}
            onChangeText={setEndDateInput}
            placeholder="2024-04-08"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>End Time (HH:MM)</Text>
          <TextInput
            style={styles.input}
            value={endTimeInput}
            onChangeText={setEndTimeInput}
            placeholder="11:00"
            placeholderTextColor="#666"
          />
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={() => setShowModal(false)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.main}>
      <Link style={styles.settingsButton} href="/settings">Settings</Link>
      <Calendar
        onDayPress={(day: CalendarDay) => {
          setSelectedDay(day.dateString);
        }}
        markedDates={{
          [selectedDay]: { selected: true }
        }}
        theme={{
          backgroundColor: '#000000',
          calendarBackground: '#000000',
          textSectionTitleColor: '#C800FA',
          selectedDayBackgroundColor: '#FFFFFF',
          selectedDayTextColor: '#000000',
          todayBackgroundColor: '#DE7AFA',
          todayTextColor: '#000000',
          dayTextColor: '#ffffff',
          monthTextColor: '#ffffff',
          textDisabledColor: '#2d4150'
        }}
        style={styles.calendar}
      />
      <View style={styles.appointmentsSection}>
        {selectedDay ? (
          getAppointmentsOfDate(selectedDay).map((appointment) => (
            <Text key={appointment.id} style={styles.appointment}>
              {formatAppointmentTime(appointment)} | {appointment.title}
            </Text>
          ))
        ) : (
          <Text style={styles.appointment}>Select a date to view appointments</Text>
        )}
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {renderAppointmentForm()}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  settingsButton: {
    alignSelf: 'flex-end',
    fontSize: 24,
    marginTop: 15,
    marginRight: 20,
    color: '#C800FA'
  },
  calendar: {
    transform: [{ scale: 1.2 }],
    marginTop: 50
  },
  appointmentsSection: {
    marginTop: 70,
    padding: 30,
    width: 350,
    maxHeight: 230,
    borderRadius: 20,
    backgroundColor: '#DE7AFA',
    overflowY: 'scroll'
  },
  appointment: {
    fontSize: 20,
    marginBottom: 10
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C800FA',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  addButtonText: {
    fontSize: 40,
    color: '#FFFFFF',
    lineHeight: 60
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#000000'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: '45%'
  },
  cancelButton: {
    backgroundColor: '#CCCCCC'
  },
  saveButton: {
    backgroundColor: '#C800FA'
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});