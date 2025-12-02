import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RecipeCard({ recipe }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RecipeDetail", { recipeId: recipe.id })
      }
      style={styles.cardContainer}
    >
      {/* Uses image taken from camera */}
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.placeholder]}>
          <Text>No image</Text>
        </View>
      )}

      <Text style={styles.recipeName} numberOfLines={1}>
        {recipe.title}
      </Text>

      {recipe.calories != null && (
        <Text style={styles.recipeCalories}>
           ~ {recipe.calories} kcal
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FCFDF7",
    borderRadius: 20,
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    width: "48%", 
  },

  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },

  recipeName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  recipeCalories: {
    fontSize: 14,
    fontWeight: "400",
    color: "#887B7B",
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE",
  },
});