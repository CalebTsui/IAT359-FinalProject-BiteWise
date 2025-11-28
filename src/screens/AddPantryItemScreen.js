// src/screens/AddPantryItemScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddPantryItemScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { sectionId, sectionTitle, onSave } = route.params;

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      // could show an Alert here
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity: Number(quantity) || 0,
      weight: weight.trim(),
      image: undefined, // later you can plug in camera/gallery
    };

    // call the callback passed from PantryScreen
    onSave(newItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add {sectionTitle}</Text>

      {/* Image placeholder area */}
      <View style={styles.imagePlaceholder} />

      {/* Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Chicken Breast"
          placeholderTextColor="#B0B0B0"
        />
      </View>

      {/* Quantity & Weight */}
      <View style={styles.inlineRow}>
            <View style={[styles.fieldGroup, styles.inlineField]}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholder="2"
                placeholderTextColor="#B0B0B0"
            />
            </View>

            <View style={[styles.fieldGroup, styles.inlineField]}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="500g"
                placeholderTextColor="#B0B0B0"
            />
            </View>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Add button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCF6",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  imagePlaceholder: {
    height: 180,
    borderRadius: 24,
    backgroundColor: "#F3F3F5",
    marginBottom: 32,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3A3A3A",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F3F3F5",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 52,
  },
  inlineField: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#FF9100",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});