import { useCallback, useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {

    const router = useRouter();
  
    const [vibrationOn, setVibrationOn] = useState<boolean>(false); // read backend for inital state of button


    useFocusEffect(useCallback(() => {
        const readSettings = async () => {
            try {
                const value = await AsyncStorage.getItem('vibration-on');
                setVibrationOn(value === "true");
            } 
            catch (e) {
                console.error(e);
            }
        }
        readSettings();
    }, []));

    const toggleVibrationOn = useCallback((vibration: boolean) => {
        const toggle = async () => {
            setVibrationOn(vibration);
    
            try {
                await AsyncStorage.setItem('vibration-on', vibration ? "true" : "false");
            } 
            catch (e) {
                console.error(e);
            }
        }
        toggle();
    }, []);

    return (
        <View style={styles.main}>
            <Text style={styles.backButton} onPress={() => router.back()}>← Back</Text>
            <View style={styles.settingsSection}>
                <Text style={styles.settingsText}>Haptic Feedback</Text>
                <Switch onValueChange={() => toggleVibrationOn(!vibrationOn)} value={vibrationOn}></Switch>
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