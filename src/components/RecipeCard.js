// import { StyleSheet, Text, View, FlatList, Image, Pressable } from "react-native";
// import React from "react";
// import { recipeList } from "../../Constant";
// import { useNavigation } from "@react-navigation/native";

// const RecipeCard = () => {
//     const navigation = useNavigation();
//     return(
//         <View>
//             <FlatList style={styles.container}
//                 data={recipeList} 
//                 renderItem={({item})=> (
//                 <Pressable 
//                 onPress={()=> navigation.navigate("Recipe Detail")} 
//                 // onPress={() => navigation.navigate("Recipe Detail", { recipe: item })}
//                 style={styles.cardContainer}>
//                     <Image style={styles.cardImage} source={item.image}/>
//                     <Text style={styles.recipeName}>{item.name}</Text>
//                     <Text style={styles.recipeCalories}>{item.calories}</Text>
//                 </Pressable>)}
//                 numColumns={2}
//                 columnWrapperStyle={{
//                     justifyContent: "space-between"
//                 }}

//                 showsVerticalScrollIndicator={false}
                
//                 />
//         </View>
        
//     );
// };

// export default RecipeCard;

// const styles = StyleSheet.create({
//     container:{
//         // paddingBottom: 50,
//         // paddingHorizontal: 4, 
//     },

//     cardContainer:{
//         // width: "48%",
//         backgroundColor: "#FCFDF7",
//         borderRadius: 20,
//         // marginVertical: 18,
//         marginBottom: 18,
//         paddingHorizontal: 12,
//         paddingTop: 12,
//         paddingBottom: 16,

//          // shadow
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.07,
//         shadowRadius: 12,
//         elevation: 3, // Android
//     },

//     cardImage:{
//         width: 144,
//         height: 144,
//         borderRadius: 12,
//         marginBottom: 12,
//         // resizeMode: "center"
//     },

//     recipeName:{
//         fontSize: 16,
//         fontWeight: 500,
//         marginBottom: 8,
//     },

//     recipeCalories:{
//         fontSize: 14,
//         fontWeight: 400,
//         color: "#887B7B",
//     },

// });



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
    width: "48%", // for 2-column grid
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