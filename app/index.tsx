import { useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


export default function Index() {
  return (
    <View style={styles.main}>
      <Link style={styles.settingsButton} href="/settings">Settings</Link>
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
  }
});