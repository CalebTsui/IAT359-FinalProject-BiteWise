import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const SPOONACULAR_API_KEY = "cc2b0c7fef2a4516ad6ea3aca0f19f12";

export default function RecipeDetail({ route }) {
  const { recipeId } = route.params;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`;
        const res = await fetch(url);
        const data = await res.json();

        console.log("DETAIL DATA:", JSON.stringify(data, null, 2)); // <- super helpful

        // If Spoonacular sends an error message
        if (data.status === "failure") {
          setError(data.message || "Error from API");
          setRecipe(null);
        } else {
          setRecipe(data);
        }
      } catch (e) {
        console.log("Error loading details", e);
        setError("Could not load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.center}>
        <Text>{error || "Error loading recipe."}</Text>
      </View>
    );
  }

  // Ingredients
  const ingredients = recipe.extendedIngredients ?? [];

  let stepsText = "No instructions.";
  if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
    const steps = recipe.analyzedInstructions[0].steps || [];
    if (steps.length > 0) {
      stepsText = steps.map((s) => `${s.number}. ${s.step}`).join("\n\n");
    }
  } else if (recipe.instructions) {
    stepsText = recipe.instructions;
  }

  return (
    <ScrollView style={styles.container}>
      {recipe.image && (
        <Image source={{ uri: recipe.image }} style={styles.image} />
      )}

      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {ingredients.length === 0 ? (
        <Text style={styles.text}>No ingredients found.</Text>
      ) : (
        ingredients.map((item, index) => (
        <Text
            key={`${item.id ?? "ingredient"}-${index}`}
            style={styles.bullet}
        >
            • {item.original}
        </Text>
        ))
      )}

      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.text}>{stepsText}</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FBFCF6",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBFCF6",
  },
});

// IGNORE 

// import React from "react";
// import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
// import myImage from "../../assets/food.jpg";

// export default function RecipeDetail() {
//     const steps = [
//         "In your Blacklock 4 Quart Deep Skillet, over medium high heat, heat the oil.",
//         "Add the onions and bell peppers and stir. Cook for about 5 to 7 minutes until translucent and a bit softer.",
//         "While this is cooking, make the tofu egg mixture. Add the tofu, nutritional yeast, kala namak, garlic powder, onion powder, milk and blend. Taste and adjust seasonings if necessary. Set aside until needed.",
//         "Add the garlic and stir for about 2 minutes until fragrant.",
//         "Add the tomato sauce, cumin, red pepper flakes and a pinch of salt and black pepper. Reduce the heat to medium and stir everything together. Cover and cook another 2 minutes.",
//         "Remove the lid, make small wells, and scoop in your tofu egg mixture. I like to do about 5 wells.",
//         "Bring heat to medium, cover, and cook for 5 minutes, then uncover and cook for 5–8 minutes until tofu is set.",
//         "Remove from heat and allow to cool until set. Top with vegan feta and parsley. Serve with pita or crusty bread, and enjoy!",
//     ];
//     return (
//         <ScrollView style={styles.container}>
//         <Image source={myImage} style={styles.image} />

//         <View style={styles.content}>
//             <Text style={styles.title}>Quick & Easy Vegan Shakshuka</Text>
//             <Text style={styles.subtitle}>
//             Shakshouka is a Maghrebi dish of eggs poached in a sauce of tomatoes,
//             olive oil, peppers, onion, and garlic.
//             </Text>
//             <Text style={styles.calories}>410 Calories per serving</Text>
//             <Text style={styles.time}>Cooking time: 30 mins</Text>

//             <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Ingredients:</Text>
//             {[
//                 "28 oz diced tomatoes, fresh or canned",
//                 "1 teaspoon ground cumin",
//                 "½ teaspoon red pepper flakes, or more",
//                 "5 cloves garlic, peeled and chopped finely",
//                 "1 medium onion, finely diced",
//                 "1 medium bell pepper, finely diced",
//                 "1 tablespoon chopped parsley or oregano",
//                 "¼ teaspoon sea salt",
//                 "½ teaspoon ground black pepper",
//                 "¼ cup vegan feta cheese",
//                 "parsley for garnish",
//             ].map((item, index) => (
//                 <Text key={index} style={styles.listItem}>
//                 • {item}
//                 </Text>
//             ))}
//             </View>

//             <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Instructions:</Text>
//             {steps.map((step, index) => (
//                 <View key={index} style={styles.stepContainer}>
//                 <Text style={styles.stepNumber}>{index + 1}.</Text>
//                 <Text style={styles.stepText}>{step}</Text>
//                 </View>
//             ))}
//             </View>
//         </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FBFCF6",
//     },
//     image: {
//         width: "100%",
//         height: 500,
//     },
//     content: {
//         padding: 24,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: "700",
//         color: "#343434",
//         marginBottom: 8,
//     },
//     subtitle: {
//         fontSize: 18,
//         color: "#343434",
//         lineHeight: 22,
//         marginBottom: 16,
//     },
//     calories: {
//         fontSize: 18,
//         color: "#FD8803",
//         fontWeight: "600",
//         marginBottom: 8,
//     },
//     time: {
//         fontSize: 18,
//         color: "#D0D0D0",
//         marginBottom: 24,
//     },
//     section: {
//         borderTopWidth: 2,
//         borderTopColor: "#D0D0D0",
//         paddingTop: 24,
//         marginBottom: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: "600",
//         color: "#343434",
//         marginBottom: 16,
        
//     },
//     listItem: {
//         fontSize: 18,
//         color: "#343434",
//         lineHeight: 22,
//     },

//     stepContainer: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 10,
//     },

//     stepNumber: {
//     fontWeight: "600",
//     color: "#343434",
//     fontSize: 16,
//     lineHeight: 22,
//     marginRight: 8, 
//     width: 24,      
//     },

//     stepText: {
//     flex: 1,
//     fontSize: 18,
//     color: "#343434",
//     lineHeight: 22,
//     marginBottom: 8,
//     }
// });


