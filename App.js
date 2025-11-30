import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

import { firebase_auth } from "./src/utils/FireBaseConfig.js";


import SignInScreen from "./src/screens/SignInScreen.js";
import ProfileScreen from "./src/screens/ProfileScreen.js";
import Dashboard from "./src/screens/HomeScreen.js";
import RecipeList from "./src/screens/RecipeList.js";
import RecipeDetail from "./src/screens/RecipeDetail.js";
import PantryScreen from "./src/screens/PantryScreen";
import AddPantryItemScreen from "./src/screens/AddPantryItemScreen";
import CameraScreen from "./src/screens/CameraScreen";
import HistoryLog from "./src/screens/HistoryLog.js";
import PreferencesScreen from "./src/screens/MainScreen.js"; // Preference form

// Icons
import homeNav from "./assets/navBarIcons/homeNav.png";
import profileNav from "./assets/navBarIcons/profileNav.png";
import recipeNav from "./assets/navBarIcons/recipeNav.png";
import pantryNav from "./assets/navBarIcons/pantryNav.png";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RecipesStack = createNativeStackNavigator();
const HomeStackNav = createNativeStackNavigator();

// Home stack (Dashboard)
function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="HomeScreen" component={Dashboard} />
    </HomeStackNav.Navigator>
  );
}

// Recipes stack
function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator>
      <RecipesStack.Screen
        name="Recipes"
        component={RecipeList}
        options={{ headerShown: false }}
      />
      <RecipesStack.Screen
        name="Recipe Detail"
        component={RecipeDetail}
      />
    </RecipesStack.Navigator>
  );
}

// Bottom Tab Navigation
function MainTabs() {
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
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeNav}
              style={{ width: 24, height: 24, tintColor: focused ? "#343434" : "#DEDFD9" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesStackScreen}
        options={{
          tabBarLabel: "Recipes",
          tabBarIcon: ({ focused }) => (
            <Image
              source={recipeNav}
              style={{ width: 24, height: 24, tintColor: focused ? "#343434" : "#DEDFD9" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pantry"
        component={PantryScreen}
        options={{
          tabBarLabel: "Pantry",
          tabBarIcon: ({ focused }) => (
            <Image
              source={pantryNav}
              style={{ width: 24, height: 24, tintColor: focused ? "#343434" : "#DEDFD9" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={profileNav}
              style={{ width: 24, height: 24, tintColor: focused ? "#343434" : "#DEDFD9" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, async (u) => {
      setUser(u);

      if (u) {
        // Check if preferences exist
        const name = await AsyncStorage.getItem("@prefs:displayName");
        const goal = await AsyncStorage.getItem("@prefs:calorieGoal");
        setHasProfile(!!name && !!goal);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "BiteWise" }} />
        ) : !hasProfile ? (
          <Stack.Screen
            name="Preferences"
            component={PreferencesScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HistoryLog"
              component={HistoryLog}
              options={{ title: "History Log" }}
            />
            <Stack.Screen
              name="AddPantryItem"
              component={AddPantryItemScreen}
              options={{ title: "Add Item" }}
            />
            <Stack.Screen
              name="CameraScreen"
              component={CameraScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
