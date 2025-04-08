import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Switch, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Link } from "expo-router";
import { Calendar } from 'react-native-calendars';

interface Appointment {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
}

const API_URL = 'https://cal-ender-backend.vercel.app/api/appointments';

export default function Index() {
  const [selectedDay, setSelectedDay] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isWholeDay, setIsWholeDay] = useState(false);
  const [title, setTitle] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Parse the date and time inputs
      let startDateTime = new Date();
      let endDateTime = new Date();
      
      if (isWholeDay) {
        // For whole day appointments, use the same date for start and end
        const [year, month, day] = startDateInput.split('-').map(Number);
        startDateTime = new Date(year, month - 1, day, 0, 0, 0);
        endDateTime = new Date(year, month - 1, day, 23, 59, 59);
      } else {
        // For regular appointments, parse both date and time
        const [startYear, startMonth, startDay] = startDateInput.split('-').map(Number);
        const [startHour, startMinute] = startTimeInput.split(':').map(Number);
        startDateTime = new Date(startYear, startMonth - 1, startDay, startHour, startMinute);
        
        const [endYear, endMonth, endDay] = endDateInput.split('-').map(Number);
        const [endHour, endMinute] = endTimeInput.split(':').map(Number);
        endDateTime = new Date(endYear, endMonth - 1, endDay, endHour, endMinute);
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          startDateTime: startDateTime.toISOString(),
          endDateTime: endDateTime.toISOString(),
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setTitle("");
        setIsWholeDay(false);
        setStartDateInput("");
        setStartTimeInput("");
        setEndDateInput("");
        setEndTimeInput("");
        fetchAppointments(); // Refresh appointments list
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const getAppointmentsOfDate = (date: string) => {
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
  };

  const formatAppointmentTime = (appointment: Appointment) => {
    const startDate = new Date(appointment.startDateTime);
    const endDate = new Date(appointment.endDateTime);
    
    if (startDate.toDateString() !== endDate.toDateString()) {
      return "(whole day)";
    }
    
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    };
    
    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  };

  return (
    <View style={styles.main}>
      <Link style={styles.settingsButton} href="/settings">Settings</Link>
      <Calendar
        onDayPress={(day: any) => {
          setSelectedDay(day.dateString)
        }}
        markedDates={{
          [selectedDay]: {selected: true }
        }}
        theme={{
          backgroundColor: '#000000',
          calendarBackground: '#000000',
          textSectionTitleColor: '#C800FA',
          selectedDayBackgroundColor: '#FFFFFF',
          selectedDayTextColor: '#000000',
          todayBackgroundColor: "#DE7AFA",
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
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000"
  },
  settingsButton:{
    alignSelf: "flex-end",
    fontSize: 24,
    marginTop: 15,
    marginRight: 20,
    color: "#C800FA"
  },
  calendar:{
    transform: [{ scale: 1.2 }],
    marginTop: 50
  },
  appointmentsSection:{
    marginTop: 70,
    padding: 30,
    width: 350,
    maxHeight: 230,
    borderRadius: 20,
    backgroundColor: "#DE7AFA",
    overflowY: "scroll"
  },
  appointment:{
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
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 40,
    color: '#FFFFFF',
    lineHeight: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#000000',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
  },
  saveButton: {
    backgroundColor: '#C800FA',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});