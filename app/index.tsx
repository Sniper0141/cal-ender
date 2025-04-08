import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import  TextLink  from  'react-native-text-link';

export default function Index() {

  function openSettings(){

  }

  return (

    <View
      style={styles.main}
    >
      <View style={styles.settingsButton}>
        <TextLink links={[{ text: 'Settings', onPress: openSettings }]}>Settings</TextLink>
      </View>
      <Link href="/settings"></Link>
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