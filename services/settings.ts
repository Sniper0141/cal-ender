import AsyncStorage from '@react-native-async-storage/async-storage';

const VIBRATION_STORAGE_KEY = 'vibration-on';

export const settingsService = {
  getVibrationSetting: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(VIBRATION_STORAGE_KEY);
      return value === 'true';
    } catch (error) {
      console.error('Error reading vibration setting:', error);
      return false;
    }
  },

  setVibrationSetting: async (vibration: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(VIBRATION_STORAGE_KEY, vibration ? 'true' : 'false');
    } catch (error) {
      console.error('Error saving vibration setting:', error);
    }
  }
}; 