import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.main}
    >
      <Text style={styles.settingsButton}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    flex: 1,
    alignItems: "center",
  },
  settingsButton:{
    alignSelf: "flex-end"
  }
});