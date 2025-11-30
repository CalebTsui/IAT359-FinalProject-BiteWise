import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { firebase_auth, firebase_db } from "../utils/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { upsertUserProfile } from "../data/userProfile";

export default function EditProfileScreen({ navigation }) {
  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [loading, setLoading] = useState(true);

  const uid = firebase_auth.currentUser?.uid;

  useEffect(() => {
    const loadProfile = async () => {
      if (!uid) return;

      try {
        const userDoc = await getDoc(doc(firebase_db, "users", uid));

        if (userDoc.exists()) {
          const data = userDoc.data();
          setNameInput(data.displayName || "");
          setGoalInput(String(data.calorieGoal || ""));
        }
      } catch (err) {
        console.log("Error loading profile:", err);
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const saveEdits = async () => {
    if (!uid) return;

    const name = nameInput.trim();
    const goal = Math.round(Number(goalInput));

    if (!name || !Number.isFinite(goal) || goal <= 0) return;

    await upsertUserProfile(uid, {
      displayName: name,
      calorieGoal: goal,
    });

    navigation.goBack(); 
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.prefTitle}>Account Details</Text>
        <Text style={styles.subtitle}>Update your information:</Text>

      <View style={styles.prefContainer}>

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

        <TouchableOpacity style={styles.saveButton} onPress={saveEdits}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

// SAME EXACT STYLES YOU PROVIDED
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FBFCF6", 
    paddingHorizontal: 24, 
    paddingTop: 64 
  },

  prefTitle: { 
    fontSize: 20, 
    marginBottom: 8, 
    fontWeight: "700", 
    color: "#343434", 
    textAlign: "center" 
  },

  prefContainer: { 
    paddingTop: 16, 
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
    marginBottom: 32, 
    textAlign: "center" 
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
    color: "#FFFFFF", 
    fontWeight: "700", 
    fontSize: 18 
  },
});
