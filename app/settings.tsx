import { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function Settings() {

    const router = useRouter();
  
    const [vibrationOn, setVibrationOn] = useState(await readSettings()); // read backend for inital state of button
    

    async function readSettings() {
        try {
            const value = await AsyncStorage.getItem('vibration-on');
            return value === "true" ? true: false;
        } 
        catch (e) {
            console.error(e);
        }
    }

    async function toggleVibrationOn(){
        setVibrationOn(previous => !previous);

        try {
            await AsyncStorage.setItem('vibration-on', vibrationOn ? "true" : "false");
        } 
        catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styles.main}>
            <Text style={styles.backButton} onPress={() => router.back()}>← Back</Text>
            <View style={styles.settingsSection}>
                <Text style={styles.settingsText}>Haptic Feedback</Text>
                <Switch onValueChange={async () => await toggleVibrationOn()} value={vibrationOn}></Switch>
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