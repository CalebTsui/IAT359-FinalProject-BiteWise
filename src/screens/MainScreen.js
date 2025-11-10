import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

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

      <View style={{ height: 40 }} />

      {/* Username Input */}
      <Text style={styles.label}>User Name</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#A1A1A1"
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      

      {/* Calorie Goal Input */}
      <Text style={styles.label}>Calorie Goal</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter calorie goal"
          placeholderTextColor="#A1A1A1"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24, 
    backgroundColor: "#FCFDF7",
    alignItems: "center",
    justifyContent: "center",
  },

  navButtons: {
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: 25,
  },

  label: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#343434",
  },
  
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    color: "#343434",

    shadowColor: "#828181",
    shadowOpacity: 0.2,
    shadowRadius: 8,

  },

  addButton: {
    backgroundColor: "#FD8803",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginLeft: 8,
    
    shadowColor: "#828181",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
