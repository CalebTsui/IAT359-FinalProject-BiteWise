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
            
                <Text style={styles.kcalText}>/{calorieGoal}</Text>
                
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

            <View style={styles.space}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCF6",
        paddingTop: 72,
        paddingHorizontal: 24,
    },

    welcomeText: {
        fontSize: 24,
        color: "#343434",
        marginBottom: 10,
    },

    userName: {
        fontSize: 32,
        color: "#343434",
        marginBottom: 16,
        fontWeight: "700",
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
        fontSize: 24,
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
        fontSize: 20,
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
        fontSize: 24,
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
        fontSize: 14,
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

    space: {
        paddingBottom: 32
    }

});
