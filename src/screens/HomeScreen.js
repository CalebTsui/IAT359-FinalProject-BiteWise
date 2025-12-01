import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import recipeImage from "../../assets/food.jpg";
import exerciseImage from "../../assets/exercise.jpg";
import { watchUserProfile } from "../data/userProfile";
import { firebase_auth, firebase_db } from "../utils/FireBaseConfig"; 
import { doc, updateDoc, onSnapshot } from "firebase/firestore";      

const recipes = [
    { id: "1", title: "Quick & Easy Vegan Shakshuka", desc: "Shakshuka is a Maghrebi dish..." },
    { id: "2", title: "Quick & Easy Vegan Shakshuka", desc: "Shakshuka is a Maghrebi dish..." },
    { id: "3", title: "Quick & Easy Vegan Shakshuka", desc: "Shakshuka is a Maghrebi dish..." },
];

const healthTips = [
    { id: "1", title: "Cheat Day or No Skip Day?", desc: "The choice between a cheat day..." },
    { id: "2", title: "Cheat Day or No Skip Day?", desc: "The choice between a cheat day..." },
    { id: "3", title: "Cheat Day or No Skip Day?", desc: "The choice between a cheat day..." },
];

export default function Dashboard() {
    const [calories, setCalories] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [calorieGoal, setCalorieGoal] = useState(null);
    const [totalCalories, setTotalCalories] = useState(0);

    const uid = firebase_auth.currentUser?.uid;
    const overLimit = calorieGoal && totalCalories > calorieGoal;

    // ⭐ NEW — Live Firestore sync for totalCalories
    useEffect(() => {
        if (!uid) return;

        const userRef = doc(firebase_db, "users", uid);

        const unsubscribe = onSnapshot(userRef, async (snap) => {
            if (!snap.exists()) return;

            const data = snap.data();

            if (typeof data.totalCalories === "number") {
                setTotalCalories(data.totalCalories);
                await AsyncStorage.setItem("@cache:totalCalories", String(data.totalCalories));
            }
        });

        return () => unsubscribe();
    }, [uid]);

    const loadCache = useCallback(async () => {
        const [name, goalStr, totalStr] = await Promise.all([
            AsyncStorage.getItem("@prefs:displayName"),
            AsyncStorage.getItem("@cache:calorieGoal"),
        ]);

        setDisplayName(name || "");
        setCalorieGoal(goalStr ? Number(goalStr) : null);
        setTotalCalories(totalStr ? Number(totalStr) : 0);
    }, []);

    const handleAddCalories = async () => {
        const num = Number(calories);

        if (!num || num <= 0) return;

        const newTotal = totalCalories + num;

        if (calorieGoal && newTotal > calorieGoal) {
            Alert.alert("Limit Exceeded", "You have gone over your daily calorie goal!");
        }

        try {
            // Update Firestore
            await updateDoc(doc(firebase_db, "users", uid), {
                totalCalories: newTotal,
            });

            setTotalCalories(newTotal);

        } catch (e) {
            console.log("Error updating totalCalories:", e);
        }

        setCalories("");
    };

    useEffect(() => {
        loadCache();
    }, [loadCache]);

    useFocusEffect(
        useCallback(() => {
            if (!uid) return;

            const unsub = watchUserProfile(uid, async (data) => {
                if (!data) return;
                const { displayName: n, calorieGoal: g } = data;

                if (typeof n === "string") {
                    setDisplayName(n);
                    await AsyncStorage.setItem("@prefs:displayName", n);
                }
                if (typeof g === "number") {
                    setCalorieGoal(g);
                    await AsyncStorage.setItem("@cache:calorieGoal", String(g));
                }
            });

            return () => unsub && unsub();
        }, [uid])
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.welcomeText}>
                Welcome back,{"\n"}
                <Text style={styles.userName}>{displayName || "Friend"}</Text>
            </Text>

            {/* Calorie Goal Card */}
            <View style={styles.calorieCard}>
                <Text style={styles.calorieGoal}>
                    Calorie Goal: {calorieGoal ?? 2000} kcal
                </Text>

                <Text style={[styles.remaining, { color: overLimit ? "red" : "#CBCBC8" }]}>
                    {overLimit
                        ? "You exceeded your limit!"
                        : `Remaining ${calorieGoal - totalCalories} kcal`}
                </Text>

                <View style={styles.divider} />

                <View style={styles.barBackground}>
                    <View
                        style={[
                            styles.barFill,
                            { width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` },
                            overLimit && { backgroundColor: "red" },
                        ]}
                    />
                </View>

                <Text style={[styles.kcalText, overLimit && { color: "red" }]}>
                    {totalCalories}/{calorieGoal} kcal
                </Text>

                <View style={styles.inputRow}>
                    <TextInput
                        placeholder="Enter your Calorie Intake"
                        placeholderTextColor="#D0D0D0"
                        style={[
                            styles.input,
                            overLimit && { borderColor: "red", borderWidth: 2 }
                        ]}
                        value={calories}
                        onChangeText={setCalories}
                    />
                    <TouchableOpacity onPress={handleAddCalories} style={styles.addCalButton}>
                        <Text style={styles.addCalButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* RECIPES */}
            <Text style={styles.sectionTitle}>Try these Recipes!</Text>
            <FlatList
                data={recipes}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.recipeCard}>
                        <Image source={recipeImage} style={styles.cardImg} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDesc}>{item.desc}</Text>
                        <Text style={styles.tryNow}>Try Now →</Text>
                    </View>
                )}
            />

            {/* HEALTH TIPS */}
            <Text style={styles.sectionTitle}>Health Tips!</Text>
            <FlatList
                data={healthTips}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.healthCard}>
                        <Image source={exerciseImage} style={styles.cardImg} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDesc}>{item.desc}</Text>
                        <Text style={styles.readNow}>Read Now →</Text>
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

    calorieCard: {
        backgroundColor: "#FCFDF7",
        padding: 20,
        borderRadius: 20,
        marginBottom: 24,
        shadowColor: "#828181",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    calorieGoal: {
        fontWeight: "600",
        fontSize: 24,
        color: "#343434",
        marginBottom: 4,
    },

    remaining: {
        marginBottom: 10,
        fontWeight: "600",
        fontSize: 16,
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
        width: "70%",
    },

    kcalText: {
        fontWeight: "600",
        fontSize: 20,
        color: "#343434",
        marginTop: 8,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },

    input: {
        flex: 1,          
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        paddingVertical: 12,
        paddingHorizontal: 20,
        color: "#343434",
        shadowColor: "#828181",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        height: 48,    
        elevation: 3,         
    },

    addCalButton: {
        backgroundColor: "#FD8803",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 30,
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
        marginLeft: 12,
    },
    
    addCalButtonText: { 
        fontWeight: "700", 
        color: "#ffffff", 
        fontSize: 16, 
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#343434",
        marginBottom: 16,
    },

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
        textDecorationLine: "underline",
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
        textDecorationLine: "underline",
    },

    space: {
        paddingBottom: 32,
    },
});
