import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function RootLayout() {

  return (
    <>
      <View style={styles.header}></View>
      <Stack screenOptions={{ headerShown: false }}/>
    </>
  );
}

const styles = StyleSheet.create({
  header:{
    height: 50,
    backgroundColor: "#C800FA"
  },
});
