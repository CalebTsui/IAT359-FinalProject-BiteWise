import { View, TextInput, StyleSheet, Image } from "react-native";
import searchIcon from "../../assets/recipeIcons/searchIcon.png";

export default function SearchFilter({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.filterContainer}>
        <Image source={searchIcon} style={styles.searchImage} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C9C9C9"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 12, 
},

  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

    filterContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 99,

        // shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 3, 
    },

    searchImage: {
        width: 22,
        height: 22,
        resizeMode: "contain",
        tintColor: "#9B9B9B", 
        marginRight: 10,
    },
});