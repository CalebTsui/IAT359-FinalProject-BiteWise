import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { categories, colors } from "../../Constant";

const CategoriesFilter = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View
            key={index}
            style={[
              styles.filterContainer,
              { backgroundColor: index === 0 ? colors.COLOR_PRIMARY : colors.COLOR_LIGHT }
            ]}
          >
            <Text style={{color: index===0 && colors.COLOR_WHITE, fontWeight: 500, fontSize: 14}}>{category.category}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesFilter;

const styles = StyleSheet.create({
  filterContainer: {
    marginTop: 18,
    marginBottom: 18,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
});