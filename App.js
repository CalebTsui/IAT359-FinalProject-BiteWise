import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import RecipeCard from "./src/screens/RecipeCard.js";
import ProfileScreen from "./src/screens/ProfileScreen.js";
import Dashboard from "./src/screens/HomeScreen.js";
import RecipeList from "./src/screens/RecipeList.js";
import PantryScreen from "./src/screens/PantryScreen.js";


import homeNav from "./assets/navBarIcons/homeNav.png";
import profileNav from "./assets/navBarIcons/profileNav.png";
import recipeNav from "./assets/navBarIcons/recipeNav.png";
import pantryNav from "./assets/navBarIcons/pantryNav.png";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Shakshuka"
        onPress={() => navigation.navigate("RecipeCard")}
        color="#FD8803"
      />
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate("Dashboard")}
        color="#FD8803"
      />
      <StatusBar style="auto" />
    </View>
  );
}

// Stack navigator for home
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="RecipeCard"
        component={RecipeCard}
        options={{ title: "Vegan Shakshuka" }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />

      <Stack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{ title: "RecipeList" }}
      />
    </Stack.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFDF7",
    alignItems: "center",
    justifyContent: "center",
  },
});
