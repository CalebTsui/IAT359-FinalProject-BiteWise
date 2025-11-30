// import { StyleSheet, View, Image, TextInput } from "react-native";
// import React from "react";
// import searchIcon from "../../assets/recipeIcons/searchIcon.png";

// const SearchFilter = ({ placeholder }) => {
//     return (
//         <View style={styles.filterContainer}>
//             <Image source={searchIcon} style={styles.searchImage} />
//             <TextInput
//                 style={styles.input}
//                 placeholder={placeholder}
//                 placeholderTextColor="#C9C9C9"
//             />
//         </View>
//     );
// };

// export default SearchFilter;

// const styles = StyleSheet.create({
//     filterContainer: {
//         backgroundColor: "#FFFFFF",
//         flexDirection: "row",
//         alignItems: "center",
//         paddingVertical: 12,
//         paddingHorizontal: 18,
//         borderRadius: 50,

//         // shadow
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.07,
//         shadowRadius: 12,
//         elevation: 3, // Android
//     },

//     searchImage: {
//         width: 22,
//         height: 22,
//         resizeMode: "contain",
//         tintColor: "#9B9B9B", // makes it gray 
//         marginRight: 10,
//     },

//     input: {
//         flex: 1,
//         fontSize: 16,
//         color: "#000",
//     },
// });


import { View, TextInput, StyleSheet } from "react-native";

export default function SearchFilter({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  input: {
    backgroundColor: "white",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 14,
    elevation: 2,
  },
});