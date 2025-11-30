import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { firebase_auth } from "../utils/FireBaseConfig";
import { upsertUserProfile } from "../data/userProfile";

export default function PreferencesScreen({ navigation }) {
  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");

  const uid = firebase_auth.currentUser?.uid;

  const savePreferences = async () => {
    if (!uid) return;

    const name = nameInput.trim();
    const goal = Math.round(Number(goalInput));

    if (!name || !Number.isFinite(goal) || goal <= 0) return;

    // Save to Firestore
    await upsertUserProfile(uid, {
      displayName: name,
      calorieGoal: goal,
    });

    // Navigate to main app
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prefTitle}>Preference Set Up</Text>

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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FBFCF6", 
    paddingHorizontal: 24, 
    paddingTop: 64 
  },
  prefTitle: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#343434", 
    textAlign: "center" 
  },

  prefContainer: { 
    paddingTop: 64, 
    justifyContent: "center", 
    alignContent: "center" 
  },

  sectionTitle: { 
    fontSize: 24, 
    fontWeight: "700", 
    color: "#343434", 
    marginBottom: 4 
  },

  subtitle: { 
    fontSize: 16, 
    color: "#343434", 
    marginBottom: 32 
  },

  inputLabel: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 8, 
    color: "#343434" 
  },

  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    fontSize: 16,
    color: "#343434",
    shadowColor: "#828181",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
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
    fontSize: 18 
  },

});
