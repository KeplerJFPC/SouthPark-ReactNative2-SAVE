import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <WebView source={{ uri: 'https://spapi.dev/' }} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});