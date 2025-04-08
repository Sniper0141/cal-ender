import { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Calendar } from 'react-native-calendars';


export default function Index() {

  const [selectedDay, setSelectedDay] = useState("");

  function getAppointmentsofDate(date: Date){
    
  }

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
        <Text style={styles.appointment}>Text</Text>
      </View>
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
    borderRadius: 20,
    backgroundColor: "#DE7AFA"
  },
  appointment:{
    fontSize: 20
  }
});