import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const VIBRATION_STORAGE_KEY = 'vibration-on';

// Main component
export default function Settings() {
  // Hooks
  const router = useRouter();
  const [vibrationOn, setVibrationOn] = useState<boolean>(false);

  // Effects
  useFocusEffect(useCallback(() => {
    const readSettings = async () => {
      try {
        const value = await AsyncStorage.getItem(VIBRATION_STORAGE_KEY);
        setVibrationOn(value === 'true');
      } catch (error) {
        console.error('Error reading vibration setting:', error);
      }
    };
    readSettings();
  }, []));

  // Event handlers
  const toggleVibrationOn = useCallback((vibration: boolean) => {
    const saveVibrationSetting = async () => {
      setVibrationOn(vibration);
  
      try {
        await AsyncStorage.setItem(VIBRATION_STORAGE_KEY, vibration ? 'true' : 'false');
      } catch (error) {
        console.error('Error saving vibration setting:', error);
      }
    };
    saveVibrationSetting();
  }, []);

  // Render
  return (
    <View style={styles.main}>
      <Text style={styles.backButton} onPress={() => router.back()}>← Back</Text>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsText}>Haptic Feedback</Text>
        <Switch 
          onValueChange={() => toggleVibrationOn(!vibrationOn)} 
          value={vibrationOn}
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000'
  },
  backButton: {
    marginTop: 15,
    marginLeft: 20,
    alignSelf: 'flex-start',
    fontSize: 24,
    color: '#C800FA'
  },
  settingsSection: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 40,
    marginLeft: 20
  },
  settingsText: {
    color: '#FFFFFF',
    fontSize: 24
  }
});