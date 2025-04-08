import { useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Settings() {
    const router = useRouter();
  

    return (
        <View
        style={styles.main}
        >
            <Text onPress={() => router.back()}>In the settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: "center",

    },
});