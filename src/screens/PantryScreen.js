import { View, Text, ScrollView, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

export default function PantryScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantry List</Text>
            <Text style={styles.screenDescription}>Here are the items in your pantry:</Text>

            <View style={styles.section}></View>

            <View style={{ marginBottom: 32 }} />
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCF6",
        paddingHorizontal: 24,
        paddingTop: 64,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#000000",
        marginBottom: 12,
    },
    screenDescription:{
        fontSize: 16,
        fontWeight: "500",
        color: "#3A3A3A",
    },

    section: {
        borderTopWidth: 2,
        borderTopColor: "#D0D0D0",
        marginTop: 24,
        marginBottom: 24,
    },

})