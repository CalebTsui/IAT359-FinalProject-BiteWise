import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { firebase_auth } from "./src/utils/FireBaseConfig.js";


import SignInScreen from "./src/screens/SignInScreen.js";
import HomeScreen from "./src/screens/MainScreen.js";
import PantryScreen from "./src/screens/PantryScreen";
import AddPantryItemScreen from "./src/screens/AddPantryItemScreen";
import CameraScreen from "./src/screens/CameraScreen";
import HistoryLog from "./src/screens/HistoryLog.js";


const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();


function EnterMain() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="PantryScreen"
        component={PantryScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="AddPantryItem"
        component={AddPantryItemScreen}
        options={{ title: "Add Item", headerShown: true, headerBackTitle: "Pantry List" }}
      />

      <MainStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />

    </MainStack.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebase_auth, (u) => {
            setUser(u);
            if (initializing) setInitializing(false);
        });
        return unsubscribe;
    }, [initializing]);

    if (initializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

  return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <>
                      <Stack.Screen
                        name="My Profile"
                        component={EnterMain}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="HistoryLog"
                        component={HistoryLog}
                        options={{ headerShown: true, title: "History Log"}}
                      />
                    </>

                ) : (
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'BiteWise' }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );

}
