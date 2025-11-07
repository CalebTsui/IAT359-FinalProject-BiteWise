import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from 'react';
// a method that gives us a chance to trigger a callback
import { onAuthStateChanged } from 'firebase/auth';

import RecipeCard from "./src/screens/RecipeCard.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home screen */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen name="RecipeCard" component={RecipeCard} options={{ title: "Vegan Shakshuka" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header1}>Home Screen</Text>
      <Button
        title="Go to Shakshuka"
        onPress={() => navigation.navigate("RecipeCard")} 
        color="#FD8803"
      />
      <StatusBar style="auto" />
    </View>
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
  }
});
