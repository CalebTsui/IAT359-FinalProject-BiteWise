import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import myImage from "../../assets/food.jpg";

export default function RecipeDetail() {
    const steps = [
        "In your Blacklock 4 Quart Deep Skillet, over medium high heat, heat the oil.",
        "Add the onions and bell peppers and stir. Cook for about 5 to 7 minutes until translucent and a bit softer.",
        "While this is cooking, make the tofu egg mixture. Add the tofu, nutritional yeast, kala namak, garlic powder, onion powder, milk and blend. Taste and adjust seasonings if necessary. Set aside until needed.",
        "Add the garlic and stir for about 2 minutes until fragrant.",
        "Add the tomato sauce, cumin, red pepper flakes and a pinch of salt and black pepper. Reduce the heat to medium and stir everything together. Cover and cook another 2 minutes.",
        "Remove the lid, make small wells, and scoop in your tofu egg mixture. I like to do about 5 wells.",
        "Bring heat to medium, cover, and cook for 5 minutes, then uncover and cook for 5–8 minutes until tofu is set.",
        "Remove from heat and allow to cool until set. Top with vegan feta and parsley. Serve with pita or crusty bread, and enjoy!",
    ];
    return (
        <ScrollView style={styles.container}>
        <Image source={myImage} style={styles.image} />

        <View style={styles.content}>
            <Text style={styles.title}>Quick & Easy Vegan Shakshuka</Text>
            <Text style={styles.subtitle}>
            Shakshouka is a Maghrebi dish of eggs poached in a sauce of tomatoes,
            olive oil, peppers, onion, and garlic.
            </Text>
            <Text style={styles.calories}>410 Calories per serving</Text>
            <Text style={styles.time}>Cooking time: 30 mins</Text>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {[
                "28 oz diced tomatoes, fresh or canned",
                "1 teaspoon ground cumin",
                "½ teaspoon red pepper flakes, or more",
                "5 cloves garlic, peeled and chopped finely",
                "1 medium onion, finely diced",
                "1 medium bell pepper, finely diced",
                "1 tablespoon chopped parsley or oregano",
                "¼ teaspoon sea salt",
                "½ teaspoon ground black pepper",
                "¼ cup vegan feta cheese",
                "parsley for garnish",
            ].map((item, index) => (
                <Text key={index} style={styles.listItem}>
                • {item}
                </Text>
            ))}
            </View>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions:</Text>
            {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
                </View>
            ))}
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCF6",
    },
    image: {
        width: "100%",
        height: 500,
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#343434",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: "#343434",
        lineHeight: 22,
        marginBottom: 16,
    },
    calories: {
        fontSize: 18,
        color: "#FD8803",
        fontWeight: "600",
        marginBottom: 8,
    },
    time: {
        fontSize: 18,
        color: "#D0D0D0",
        marginBottom: 24,
    },
    section: {
        borderTopWidth: 2,
        borderTopColor: "#D0D0D0",
        paddingTop: 24,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#343434",
        marginBottom: 16,
        
    },
    listItem: {
        fontSize: 18,
        color: "#343434",
        lineHeight: 22,
    },

    stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    },

    stepNumber: {
    fontWeight: "600",
    color: "#343434",
    fontSize: 16,
    lineHeight: 22,
    marginRight: 8, 
    width: 24,      
    },

    stepText: {
    flex: 1,
    fontSize: 18,
    color: "#343434",
    lineHeight: 22,
    marginBottom: 8,
    }
});
