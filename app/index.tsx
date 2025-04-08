import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {


  return (

    <View
      style={styles.main}
    >
      <View style={styles.settingsButton}>
        <Link href="/settings"></Link>
      </View>
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