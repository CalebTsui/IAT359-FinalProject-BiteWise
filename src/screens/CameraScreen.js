import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return <View />;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Captured:", photo.uri);
      // TODO: upload to Firestore/storage or attach to an item
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} />

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <View style={styles.captureInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#000" 
    },
    
    camera: { 
        flex: 1 
    },
    
    controls: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
  captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },

    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
    },
});
