import { useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firebase_app } from "../utils/FireBaseConfig"; 

const firebase_db = getFirestore(firebase_app);

const uploadToCloudinary = async (uri) => {
  try {
    const data = new FormData();
    data.append("file", {
      uri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    data.append("upload_preset", "grocery-image"); 

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkk98zgl7/image/upload",
      { method: "POST", body: data }
    );

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error?.message || "Cloudinary upload failed");
    }
    return result.secure_url; 
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};

export default function CameraScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const onCapture = route?.params?.onCapture;  // <-- callback from AddItem

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission?.granted) return <View />;

  // const takePicture = async () => {
  //   if (!cameraRef.current) return;

  //   try {
  //     const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
  //     console.log("Captured:", photo.uri);

  //     // Upload to Cloudinary
  //     const imgUrl = await uploadToCloudinary(photo.uri);
  //     console.log("Cloudinary URL:", imgUrl);

  //     // Save URL to Firestore
  //     await addDoc(collection(firebase_db, "photos"), {
  //       imageUrl: imgUrl,
  //       createdAt: serverTimestamp(),
  //     });
      
  //     Alert.alert("Success", "Photo uploaded successfully!");

  //     navigation.goBack();

  //   } catch (err) {
  //     console.error("Error uploading photo:", err);
  //     Alert.alert("Upload Failed");
  //   }

  // };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      console.log("Captured:", photo.uri);

      // Upload to Cloudinary
      const imgUrl = await uploadToCloudinary(photo.uri);
      console.log("Cloudinary URL:", imgUrl);

      // If we were opened from AddPantryItemScreen, send the URL back
      if (onCapture) {
        onCapture(imgUrl);          // <--- give image URL back to AddItem screen
      } else {
        // Optional: keep your generic photos collection for other use cases
        await addDoc(collection(firebase_db, "photos"), {
          imageUrl: imgUrl,
          createdAt: serverTimestamp(),
        });
        Alert.alert("Success", "Photo uploaded successfully!");
      }

      navigation.goBack();
    } catch (err) {
      console.error("Error uploading photo:", err);
      Alert.alert("Upload Failed");
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
