import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CameraScreen from "./CameraScreen.js";


export default function PantryScreen() {
    const navigation = useNavigation();
  const [sections, setSections] = useState([
    {
      id: "protein",
      title: "Proteins",
      data: [
        { id: "chicken", name: "Chicken Breast", image: undefined },
        { id: "beef", name: "Ground Beef", image: undefined },
      ],
    },
    {
      id: "produce",
      title: "Fresh Produce",
      data: [
        { id: "veggies", name: "Veggies", image: undefined },
        { id: "apple", name: "Apple", image: undefined },
      ],
    },
  ]);

  const addItemToSection = useCallback((sectionId) => {
    // TODO: open a modal/sheet to choose an item; stubbed for now
    const newItem = {
      id: Math.random().toString(36).slice(2),
      name: "New Item",
    };
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, data: [newItem, ...s.data] } : s))
    );
  }, []);

  const renderItem = useCallback(({ item }) => <ItemCard item={item} />, []);
  const renderSectionHeader = useCallback(
    ({ section }) => (
      <SectionHeader title={section.title} onAdd={() => addItemToSection(section.id)} />
    ),
    [addItemToSection]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantry List</Text>
      <Text style={styles.screenDescription}>Here are the items in your pantry:</Text>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 24 }} />}
      />

      {/* Floating Add Button */}
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate("CameraScreen")}
    >
      <Text style={styles.floatingButtonText}>+</Text>
    </TouchableOpacity>

    </View>
  );
}

/* ---------- Components ---------- */

function SectionHeader({ title, onAdd }) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.addBtn} onPress={onAdd} accessibilityRole="button" accessibilityLabel={`Add item to ${title}`}>
        <Text style={styles.addBtnText}>Add Item +</Text>
      </TouchableOpacity>
    </View>
  );
}

const ItemCard = React.memo(({ item }) => {
  return (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImage} />
      )}
      <Text style={styles.cardTitle}>{item.name}</Text>
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
        height: 110,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: "#E5E7EB",
    },
    
    cardTitle: { 
        fontWeight: "600" 
    },

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

    floatingButtonText: {
        color: "#fff",
        fontSize: 36,
        lineHeight: 36,
        marginBottom: 2,
    },

});