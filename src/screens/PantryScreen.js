import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CameraScreen from "../screens/CameraScreen";

import cameraIcon from "../../assets/camera.png"

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebase_db, firebase_auth } from "../utils/FireBaseConfig";

const SECTION_CONFIG = [
  { id: "protein", title: "Proteins" },
  { id: "produce", title: "Fresh Produce" },
  // add more section definitions here later
];

export default function PantryScreen() {

  const navigation = useNavigation();

  const [sections, setSections] = useState(
    SECTION_CONFIG.map((section) => ({
      ...section,
      data: [],
    }))
  );

  
//sections to add products
//sections to add products to firebase
  useEffect(() => {
  const user = firebase_auth.currentUser;
  if (!user) return;

  const q = query(
    collection(firebase_db, "users", user.uid, "pantryItems"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    const grouped = SECTION_CONFIG.map((section) => ({
      ...section,
      data: items.filter((item) => item.sectionId === section.id),
    }));

    setSections(grouped);
  });

  // cleanup when screen unmounts
  return () => unsubscribe();
}, []);

  // Add new item to pantry
  const handleAddItemPress = useCallback(
    (sectionId, sectionTitle) => {
      navigation.navigate("AddPantryItem", {
        sectionId,
        sectionTitle,
      });
    },
    [navigation]
  );

  //Handler to remove item from section
  const removeItemFromSection = useCallback(async (sectionId, itemId) => {
    const user = firebase_auth.currentUser;
    if (!user) return;

    await deleteDoc(
      doc(firebase_db, "users", user.uid, "pantryItems", itemId)
    );
  }, []);

  // helper to chunk items into rows of 2
  const makeRows = (items) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(items.slice(i, i + 2));
    }
    return rows;
  };

  // SectionList expects `data`, so need to give it rows
  const sectionData = useMemo(
    () =>
      sections.map((s) => ({
        ...s,
        data: makeRows(s.data), // each item --> array of 1–2 cards
      })),
    [sections]
  );

  // New Render section
  const renderSectionHeader = useCallback(
    ({ section }) => (
      <SectionHeader
        title={section.title}
        onAdd={() => handleAddItemPress(section.id, section.title)}
      />
    ),
    [handleAddItemPress]
  );

  // New render row
  const renderRow = useCallback(({ item: row, section }) => {
  return (
    <View style={styles.row}>   
      {row.map((cardItem) => (
        <View style={styles.cardWrapper} key={cardItem.id}>
          <ItemCard
            item={cardItem}
            onRemove={() => removeItemFromSection(section.id, cardItem.id)}
          />
        </View>
      ))}
      {row.length === 1 && <View style={[styles.cardWrapper, { opacity: 0 }]} />}
    </View>
  );
}, [removeItemFromSection]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantry List</Text>
      <Text style={styles.screenDescription}>Here are the items in your pantry:</Text>

      <SectionList
        sections={sectionData}
        keyExtractor={(row, index) => index.toString()}
        renderItem={renderRow}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Add Button */}
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate("CameraScreen")}
    >
      <Image source={cameraIcon} style={styles.iconImage}/>
    </TouchableOpacity>

    </View>
  );
}

/* ---------- Components ---------- */

function SectionHeader({ title, onAdd }) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel={`Add item to ${title}`}
      >
        <Text style={styles.addBtnText}>Add Item +</Text>
      </TouchableOpacity>
    </View>
  );
}

const ItemCard = React.memo(({ item, onRemove }) => {
  return (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImage} />
      )}

      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardMeta}>Qty: {item.quantity}</Text>
      <Text style={styles.cardMeta}>Weight: {item.weight}</Text>

      <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
        <Text style={styles.removeBtnText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
});

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCF6",
        paddingHorizontal: 24,
        paddingTop: 64,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#000000",
        marginBottom: 8,
    },
    screenDescription: {
        fontSize: 16,
        fontWeight: "500",
        color: "#3A3A3A",
        marginBottom: 16,
    },
    listContent: { paddingBottom: 48 },

      /* 2-column layout */
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    cardWrapper: {
      flex: 1,
      marginRight: 12,
    },

    /* Section header */
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 8,
    },
    headerTitle: { fontSize: 18, fontWeight: "700" },
    addBtn: {
        backgroundColor: "#EFEFEF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },
    addBtnText: { fontWeight: "600" },

    /* Item card */
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    cardImage: {
        width: "100%",
        // height: 110,
        aspectRatio: 4 / 3,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: "#E5E7EB",
    },
    
    cardTitle: { 
      fontWeight: "600" ,
      fontSize: 14,
      marginBottom: 2,
    },
    
    cardMeta: {
      fontSize: 12,
      color: "#6B7280",
    },
    removeBtn:{
      marginTop: 10,
      paddingVertical: 10,
      borderRadius: 999,
      alignItems: "center",
      backgroundColor: "#F7F2E9",
    },

    removeBtnText: {
      fontSize: 13,
      fontWeight: "600",
      color: "#3A3A3A",
    },

    //Camera Button
    floatingButton: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 100, 
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#828181",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },

        zIndex: 10,
    },

    iconImage: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },



});