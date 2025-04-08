import { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useRouter } from "expo-router";

export default function Settings() {

    const router = useRouter();
  
    const [vibrationOn, setVibrationOn] = useState(readSettings()); // read backend for inital state of button
    

    function readSettings() {
        // Read
        // return boolean
        return false;
    }

    function toggleVibrationOn(){
        setVibrationOn(previous => !previous);
    }

    return (
        <View style={styles.main}>
            <Text style={styles.backButton} onPress={() => router.back()}>← Back</Text>
            <View style={styles.settingsSection}>
                <Text style={styles.settingsText}>Haptic Feedback</Text>
                <Switch onValueChange={toggleVibrationOn} value={vibrationOn}></Switch>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: "#000000"
    },
    backButton:{
        marginTop: 15,
        marginLeft: 20,
        alignSelf: "flex-start",
        fontSize: 24,
        color: "#C800FA"
    },
    settingsSection:{
        flexDirection: "row",
        gap: 20,
        marginTop: 40,
        marginLeft: 20,
    },
    settingsText:{
        color: "#FFFFFF",
        fontSize: 24
    }
});