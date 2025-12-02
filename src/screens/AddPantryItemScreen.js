import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import CameraScreen from "../screens/CameraScreen";

import cameraIcon from "../../assets/camera.png"

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firebase_db, firebase_auth } from "../utils/FireBaseConfig";


export default function AddPantryItemScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { sectionId, sectionTitle, onSave } = route.params;

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");

  // Camera + Image Stuff
  const [imageUri, setImageUri] = useState(null);

  const handleOpenCamera = () => {
    navigation.navigate("CameraScreen", {
        onCapture: (url) => { // receives Cloudinary URL
        setImageUri(url);
        },
    });
  };


  const handleAdd = async () => {
    if (!name.trim()) return;

    const user = firebase_auth.currentUser;
    if (!user) return;

    await addDoc(collection(firebase_db, "users", user.uid, "pantryItems"), {
      name: name.trim(),
      quantity: Number(quantity) || 0,
      weight: weight.trim(),
      sectionId,       
      imageUrl: imageUri || null,
      createdAt: serverTimestamp(),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add {sectionTitle}</Text>

      <TouchableOpacity
            style={styles.imagePlaceholder}
            onPress={handleOpenCamera}
            activeOpacity={0.8}
            >
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
                <Text style={styles.addImageText}>+  Add Image</Text>
            )}
      </TouchableOpacity>

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

    //   Camera Stuff
    imagePlaceholder: {
      height: 180,
      borderRadius: 24,
      backgroundColor: "#F3F3F5",
      marginBottom: 32,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    addImageText: {
      color: "#FF9100",
      fontSize: 16,
      fontWeight: "600",
    },
    imagePreview: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },

    // cameraFab: {
    // position: "absolute",
    // right: 24,
    // bottom: 96, // adjust so it floats above the Add button
    // width: 64,
    // height: 64,
    // borderRadius: 32,
    // backgroundColor: "#000",
    // justifyContent: "center",
    // alignItems: "center",

    // shadowColor: "#828181",
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: 0 },
    // },
    // cameraIcon: {
    // width: 30,
    // height: 30,
    // resizeMode: "contain",
    // },
});