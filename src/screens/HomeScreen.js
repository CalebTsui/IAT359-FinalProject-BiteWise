import React, { useState, useEffect, useCallback } from "react";
import {View, Text, ScrollView, TextInput, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import recipeImage from "../../assets/food.jpg";
import exerciseImage from "../../assets/exercise.jpg";
import { watchUserProfile } from '../data/userProfile';
import { firebase_auth } from '../utils/FireBaseConfig';


const recipes = [
    { id: "1", title: "Quick & Easy Vegan Shakshuka", desc: "Shakshuka is a Maghrebi dish of eggs poached in a sauce of tomatoes, olive oil, peppers, onion, and garlic." },
    { id: "2", title: "Quick & Easy Vegan Shakshuka", desc: "Shakshuka is a Maghrebi dish of eggs poached in a sauce of tomatoes, olive oil, peppers, onion, and garlic." },
    { id: "3", title: "Quick & Easy Vegan Shakshuka", desc: "Shakshuka is a Maghrebi dish of eggs poached in a sauce of tomatoes, olive oil, peppers, onion, and garlic." },
];

const healthTips = [
    { id: "1", title: "Cheat Day or No Skip Day?", desc: "The choice between a cheat day or no cheat day depends on your personal goals, diet, and relationship with food." },
    { id: "2", title: "Cheat Day or No Skip Day?", desc: "The choice between a cheat day or no cheat day depends on your personal goals, diet, and relationship with food." },
    { id: "3", title: "Cheat Day or No Skip Day?", desc: "The choice between a cheat day or no cheat day depends on your personal goals, diet, and relationship with food." },
];

export default function Dashboard() {
//   const [calories, setCalories] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [calorieGoal, setCalorieGoal] = useState(null);

//   const loadPrefs = useCallback(async () => {
//     try {
//       const name = await AsyncStorage.getItem("@prefs:displayName");
//       const goalStr = await AsyncStorage.getItem("@prefs:calorieGoal");
//       setDisplayName(name ?? "");
//       const parsed = goalStr != null ? parseInt(goalStr, 10) : NaN;
//       setCalorieGoal(Number.isNaN(parsed) ? null : parsed);
//     } catch (e) {
//       console.warn("Failed to load prefs", e);
//     }
//   }, []);

//     // load once
//     useEffect(() => {
//         loadPrefs();
//     }, [loadPrefs]);
//     // reload whenever the screen is focused
//     useFocusEffect(
//         useCallback(() => {
//         loadPrefs();
//         }, [loadPrefs])
//     );

    const [calories, setCalories] = useState("");
    const [displayName, setDisplayName] = useState('');
    const [calorieGoal, setCalorieGoal] = useState(null);

    const uid = firebase_auth.currentUser?.uid;

    const loadCache = useCallback(async () => {
        const [name, goalStr] = await Promise.all([
        AsyncStorage.getItem('@prefs:displayName'),
        AsyncStorage.getItem('@cache:calorieGoal'),
        ]);
        setDisplayName(name || '');
        setCalorieGoal(goalStr ? Number(goalStr) : null);
    }, []);

    useEffect(() => { loadCache(); }, [loadCache]);

    useFocusEffect(useCallback(() => {
        if (!uid) return;
        // live Firestore subscription
        const unsub = watchUserProfile(uid, async (data) => {
        if (!data) return;
        const { displayName: n, calorieGoal: g } = data;
        if (typeof n === 'string') {
            setDisplayName(n);
            await AsyncStorage.setItem('@prefs:displayName', n);
        }
        if (typeof g === 'number') {
            setCalorieGoal(g);
            await AsyncStorage.setItem('@cache:calorieGoal', String(g));
        }
        });
        return () => unsub && unsub();
    }, [uid]));

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            {/* <Text style={styles.welcomeText}>
                Welcome back,{"\n"}
                <Text style={styles.userName}>{displayName || "Friend"}</Text>
            </Text> */}

            <Text style={styles.welcomeText}>
                Welcome back,{"\n"}
                <Text style={styles.userName}>{displayName || 'Friend'}</Text>
            </Text>


            {/* Date Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {/* Past Dates */}
                <View style={[styles.dateCircle, styles.pastDate]}>
                    <Text style={[styles.dateText, styles.pastText]}>Sun</Text>
                    <Text style={[styles.dateNum, styles.pastText]}>01</Text>
                </View>
                <View style={[styles.dateCircle, styles.pastDate]}>
                    <Text style={[styles.dateText, styles.pastText]}>Mon</Text>
                    <Text style={[styles.dateNum, styles.pastText]}>02</Text>
                </View>

                {/* Current Date */}
                <View style={[styles.dateCircle, styles.activeDate]}>
                    <Text style={[styles.dateText, styles.activeText]}>Tue</Text>
                    <Text style={[styles.dateNum, styles.activeText]}>03</Text>
                </View>

                {/* Future Dates */}
                <View style={[styles.dateCircle, styles.futureDate]}>
                    <Text style={[styles.dateText, styles.futureText]}>Wed</Text>
                    <Text style={[styles.dateNum, styles.futureText]}>04</Text>
                </View>
                <View style={[styles.dateCircle, styles.futureDate]}>
                    <Text style={[styles.dateText, styles.futureText]}>Thu</Text>
                    <Text style={[styles.dateNum, styles.futureText]}>05</Text>
                </View>
            </ScrollView>

            {/* Calorie Goal Card */}
            <View style={styles.calorieCard}>
                <Text style={styles.calorieGoal}>
                    Calorie Goal: {calorieGoal ?? 2000}kcal
                </Text>
                <Text style={styles.remaining}>Remaining only 300 kcal</Text>

                <View style={styles.divider} />
                
                <View style={styles.barBackground}>
                    <View style={styles.barFill} />
                </View>
            
                <Text style={styles.kcalText}>1100/1500 kcal</Text>
                
                <TextInput
                    placeholder="Enter your Calorie Intake"
                    placeholderTextColor="#D0D0D0"
                    style={styles.input}
                    value={calories}
                    onChangeText={setCalories}
                />
            </View>

            {/* Recipes */}
            <Text style={styles.sectionTitle}>Try these Recipes!</Text>
            <FlatList
                data={recipes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.recipeCard}>
                        <TouchableOpacity>
                            <Image source={recipeImage} style={styles.cardImg} />
                        </TouchableOpacity>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDesc}>{item.desc}</Text>
                        <TouchableOpacity>
                            <Text style={styles.tryNow}>Try Now →</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Health Tips */}
            <Text style={styles.sectionTitle}>Health Tips!</Text>
            <FlatList
                data={healthTips}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.healthCard}>
                        <TouchableOpacity>
                            <Image source={exerciseImage} style={styles.cardImg} />
                        </TouchableOpacity>
                        
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDesc}>{item.desc}</Text>
                        <TouchableOpacity>
                            <Text style={styles.readNow}>Read Now →</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCF6",
        padding: 24,
    },

    welcomeText: {
        fontSize: 20,
        color: "#343434",
        marginBottom: 10,
    },

    userName: {
        fontSize: 24,
        color: "#343434",
        marginBottom: 16,
        fontWeight: "700",
    },

    // Date scroll
    dateScroll: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 8,
    },

    dateCircle: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 70,
        height: 100,
        marginRight: 12,
    },

    pastDate: {
        backgroundColor: "#EFF0EA",
    },
    pastText: {
        color: "#DEDFD9",
        fontWeight: "700",
    },

    activeDate: {
        backgroundColor: "#F8D289",
    },
    activeText: {
        color: "#343434",
        fontWeight: "700",
    },

    futureDate: {
        backgroundColor: "#EFF0EA",
    },
    futureText: {
        color: "#343434",
        fontWeight: "700",
    },

    dateText: {
        fontSize: 16,
    },

    dateNum: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 10,
    },

    // Calorie Goal Card
    calorieCard: {
        backgroundColor: "#FCFDF7",
        padding: 20,
        borderRadius: 20,
        marginBottom: 24,
        shadowColor: "#828181",
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    calorieGoal: {
        fontWeight: "600",
        fontSize: 20,
        color: "#343434",
        marginBottom: 4,
    },

    remaining: {
        color: "#DEDFD9",
        marginBottom: 10,
    },

    divider: {
        height: 2,
        backgroundColor: "#EFF0EA",
        marginBottom: 16, 
    },

    barBackground: {
        backgroundColor: "#EFF0EA",
        height: 30,
        borderRadius: 100,
        overflow: "hidden",
    },

    barFill: {
        backgroundColor: "#FD8803",
        height: 30,
        borderRadius: 100,
        width: "70%", // placeholder width
    },

    kcalText: {
        fontWeight: "600",
        fontSize: 16,
        color: "#343434",
        marginTop: 8,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 10,
        color: "#343434",
        shadowColor: "#828181",
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#343434",
        marginBottom: 16,
    },

    // Cards

    cardImg: {
        width: "100%",
        height: 100,
        borderRadius: 15,
        marginBottom: 10,
    },

    cardTitle: {
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 4,
        color: "#343434",
    },

    cardDesc: {
        color: "#343434",
        fontSize: 12,
        marginVertical: 10,
    },

    recipeCard: {
        backgroundColor: "#E8F08E",
        borderRadius: 20,
        padding: 20,
        width: 200,
        marginRight: 16,
        marginBottom: 24,

    },

    tryNow: {
        color: "#9DA454",
        fontWeight: "600",
        textDecorationLine: 'underline',
    },

    healthCard: {
        backgroundColor: "#CDEBFF",
        borderRadius: 20,
        padding: 20,
        width: 200,
        marginRight: 16,
    },

    readNow: {
        color: "#5D9AB0",
        fontWeight: "600",
        textDecorationLine: 'underline',
    },


});
