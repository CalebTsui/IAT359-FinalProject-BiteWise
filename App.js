import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import RecipeCard from "./src/screens/RecipeCard.js";
import ProfileScreen from "./src/screens/ProfileScreen.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// home screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Button
        title="Go to Shakshuka"
        onPress={() => navigation.navigate("RecipeCard")}
        color="#FD8803"
      />
      <StatusBar style="auto" />
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="RecipeCard" component={RecipeCard} options={{ title: "Vegan Shakshuka" }} />
    </Stack.Navigator>
  );
}

// bottom nav
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FD8803",
          tabBarInactiveTintColor: "#343434",
          tabBarStyle: {
            backgroundColor: "#FBFCF6",
            height: 80,
            paddingBottom: 10,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header1: {
    fontSize: 24,
    marginBottom: 20,
  },
});
