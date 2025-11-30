// import { View, Text, ScrollView, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
// import { useState } from "react";
// import SearchFilter from "../components/SearchFilter";
// import CategoriesFilter from "../components/CategoriesFilter";
// import RecipeCard from "../components/RecipeCard";

// export default function RecipeList() {

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Recipes</Text>
//             <Text style={styles.screenDescription}>Here’s some recipes based on your pantry list:</Text>

//             <View style={styles.section}></View>

//             <SearchFilter placeholder={"Search recipe..."}/>

//             {/* Categories Filter */}
//             <View>
//                 {/* Categories List */}
//                 <CategoriesFilter/> 
//             </View>

//             {/* Recipe List Filter */}
//             <View style={{ flex: 1 }}>
//                 {/* Recipe List */}
//                 <RecipeCard/>
//             </View>
//         </View>
        
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FBFCF6",
//         paddingHorizontal: 24,
//         paddingTop: 64,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: "700",
//         color: "#000000",
//         marginBottom: 12,
//     },
//     screenDescription:{
//         fontSize: 15,
//         fontWeight: "500",
//         color: "#3A3A3A",
//     },

//     section: {
//         borderTopWidth: 2,
//         borderTopColor: "#D0D0D0",
//         marginTop: 24,
//         marginBottom: 24,
//     },

// })

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";

import SearchFilter from "../components/SearchFilter";
import CategoriesFilter from "../components/CategoriesFilter";
import RecipeCard from "../components/RecipeCard";

const SPOONACULAR_API_KEY = "cc2b0c7fef2a4516ad6ea3aca0f19f12";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

// For now, mock pantry ingredients (replace with your real pantry later)
const MOCK_PANTRY = ["bread"];

// Map your “Breakfast / Lunch / Dinner” to spoonacular `type` values
const MEAL_TYPE_MAP = {
  Breakfast: "breakfast",
  Lunch: "main course",
  Dinner: "main course",
};

export default function RecipeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [selectedCalories, setSelectedCalories] = useState(null); 
  // e.g. { min: 0, max: 400 } or { min: 800, max: null }

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Build URL whenever filters/search change
  const requestUrl = useMemo(() => {
    const params = [];

    params.push(`apiKey=${SPOONACULAR_API_KEY}`);
    params.push("number=20"); // how many recipes
    params.push("addRecipeInformation=true"); // include images, summary, etc.
    params.push("addRecipeNutrition=true");   // so we can get calories

    // Pantry → includeIngredients
    if (MOCK_PANTRY.length > 0) {
      const ingredients = encodeURIComponent(MOCK_PANTRY.join(","));
      params.push(`includeIngredients=${ingredients}`);
    }

    // Search bar text
    if (searchQuery.trim().length > 0) {
      params.push(`query=${encodeURIComponent(searchQuery.trim())}`);
    }

    // Meal type (Breakfast / Lunch / Dinner)
    const type = MEAL_TYPE_MAP[selectedMeal];
    if (type) {
      params.push(`type=${encodeURIComponent(type)}`);
    }

    // Calories range (from CategoriesFilter)
    if (selectedCalories) {
      if (selectedCalories.min != null) {
        params.push(`minCalories=${selectedCalories.min}`);
      }
      if (selectedCalories.max != null) {
        params.push(`maxCalories=${selectedCalories.max}`);
      }
    }

    return `${BASE_URL}?${params.join("&")}`;
  }, [searchQuery, selectedMeal, selectedCalories]);

  // Fetch recipes when URL changes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(requestUrl);
        const data = await res.json();

        // spoonacular returns results[]
        const mapped = (data.results || []).map((item) => {
          // get calories if nutrition was requested
          const caloriesObj =
            item.nutrition?.nutrients?.find(
              (n) => n.name === "Calories"
            ) || null;

          return {
            id: item.id.toString(),
            title: item.title,
            image: item.image,
            calories: caloriesObj ? Math.round(caloriesObj.amount) : null,
            // you can add more fields if needed
          };
        });

        setRecipes(mapped);
      } catch (err) {
        console.log("Error fetching recipes", err);
        setError("Could not load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [requestUrl]);

  const renderRecipe = ({ item }) => (
    <RecipeCard recipe={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <Text style={styles.screenDescription}>
        Here’s some recipes based on your pantry list:
      </Text>

      <View style={styles.section} />

      {/* Search bar */}
      <SearchFilter
        placeholder="Search recipe..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Meal + calories filter chips */}
      <CategoriesFilter
        selectedMeal={selectedMeal}
        onChangeMeal={setSelectedMeal}
        selectedCalories={selectedCalories}
        onChangeCalories={setSelectedCalories}
      />

      {/* Recipe List */}
      <View style={{ flex: 1, marginTop: 16 }}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id}
            renderItem={renderRecipe}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

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
    marginBottom: 12,
  },
  screenDescription: {
    fontSize: 15,
    fontWeight: "500",
    color: "#3A3A3A",
  },
  section: {
    borderTopWidth: 2,
    borderTopColor: "#D0D0D0",
    marginTop: 24,
    marginBottom: 24,
  },
  errorText: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});