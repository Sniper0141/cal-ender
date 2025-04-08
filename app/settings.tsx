import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { settingsService } from '../services/settings';

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
      const value = await settingsService.getVibrationSetting();
      setVibrationOn(value);
    };
    readSettings();
  }, []));

  // Event handlers
  const toggleVibrationOn = useCallback(async (vibration: boolean) => {
    setVibrationOn(vibration);
    await settingsService.setVibrationSetting(vibration);
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