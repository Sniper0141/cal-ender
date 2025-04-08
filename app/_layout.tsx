import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// Main component
export default function RootLayout() {
  return (
    <>
      <View style={styles.header} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#C800FA'
  }
});
