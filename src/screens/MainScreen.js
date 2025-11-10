import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase_auth } from "../utils/FireBaseConfig";
import { upsertUserProfile } from "../data/userProfile";

import RecipeCard from "./RecipeCard.js";
import ProfileScreen from "./ProfileScreen.js";
import Dashboard from "./HomeScreen.js";
import RecipeList from "./RecipeList.js";
import PantryScreen from "./PantryScreen.js";

import homeNav from "../../assets/navBarIcons/homeNav.png";
import profileNav from "../../assets/navBarIcons/profileNav.png";
import recipeNav from "../../assets/navBarIcons/recipeNav.png";
import pantryNav from "../../assets/navBarIcons/pantryNav.png";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function PreferencesScreen({ navigation }) {
  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");

  const uid = firebase_auth.currentUser?.uid;

  const savePreferences = async () => {
    if (!uid) return;

    const name = nameInput.trim();
    const goal = Math.round(Number(goalInput));

    if (!name || !Number.isFinite(goal) || goal <= 0) return;

    // Save locally
    await AsyncStorage.setItem("@prefs:displayName", name);
    await AsyncStorage.setItem("@prefs:calorieGoal", String(goal));

    // Save to Firestore
    await upsertUserProfile(uid, {
      displayName: name,
      calorieGoal: goal,
    });

    // Reset navigation stack so user can't go back
  navigation.reset({
    index: 0,
    routes: [{ name: "HomeScreen" }],
  });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prefTitle}>Preference set up</Text>

      <View style={styles.prefContainer}>

        <Text style={styles.sectionTitle}>Account Details</Text>
        <Text style={styles.subtitle}>Please enter your preferences:</Text>

        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your name"
          placeholderTextColor="#A1A1A1"
          value={nameInput}
          onChangeText={setNameInput}
        />

        <Text style={styles.inputLabel}>Daily Calorie Goal</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter calorie goal"
          placeholderTextColor="#A1A1A1"
          keyboardType="numeric"
          value={goalInput}
          onChangeText={setGoalInput}
        />

        <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeCard"
        component={RecipeCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{ title: "Recipes" }}
      />
    </Stack.Navigator>
  );
}

export default function MainScreen() {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#343434",
          tabBarInactiveTintColor: "#DEDFD9",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            height: 90,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "600",
          },
        }}
      >
        {/* Home Nav */}
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Image
                source={homeNav}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#343434" : "#DEDFD9",
                }}
              />
            ),
          }}
        />

        {/* Recipes Nav */}
        <Tab.Screen
          name="Recipes"
          component={RecipeList}
          options={{
            tabBarLabel: "Recipes",
            tabBarIcon: ({ focused }) => (
              <Image
                source={recipeNav}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#343434" : "#DEDFD9",
                }}
              />
            ),
          }}
        />

        {/* Pantry Nav */}
        <Tab.Screen
          name="Pantry"
          component={PantryScreen}
          options={{
            tabBarLabel: "Pantry",
            tabBarIcon: ({ focused }) => (
              <Image
                source={pantryNav}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#343434" : "#DEDFD9",
                }}
              />
            ),
          }}
        />

        {/* Profile Nav */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => (
              <Image
                source={profileNav}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#343434" : "#DEDFD9",
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

// =========================
// Styles
// =========================
const styles = StyleSheet.create({

  container: {
        flex: 1,
        backgroundColor: "#FBFCF6",
        paddingHorizontal: 24,
        paddingTop: 64,
    },

  prefTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#343434",
    textAlign: "center",
  },

  prefContainer: {
    paddingTop: 64,
    justifyContent: "center",
    alignContent: "center",
  },
  
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#343434",
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: 16,
    color: "#343434",
    marginBottom: 32,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#343434",
  },
  
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    fontSize: 16,
    color: "#343434",

    // shadow
    shadowColor: "#828181",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3, // Android
  },

  saveButton: {
    backgroundColor: "#FD8803",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 16,
    marginTop: 32,
    width: "50%",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

});
