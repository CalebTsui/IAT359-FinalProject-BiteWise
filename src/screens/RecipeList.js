import { View, Text, ScrollView, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import SearchFilter from "../components/SearchFilter";

export default function RecipeList() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipes</Text>
            <Text style={styles.screenDescription}>Here’s some recipes based on your pantry list:</Text>

            <View style={styles.section}></View>

            <SearchFilter placeholder={"Search recipe..."}/>
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
        fontSize: 15,
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