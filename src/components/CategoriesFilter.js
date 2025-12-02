import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const MEALS = ["Breakfast", "Lunch", "Dinner"];

const CALORIE_OPTIONS = [
  { label: "under 400 kcal", value: { min: 0, max: 400 } },
  { label: "500-800 kcal", value: { min: 500, max: 800 } },
  { label: "800+ kcal", value: { min: 800, max: null } },
];

export default function CategoriesFilter({
  selectedMeal,
  onChangeMeal,
  selectedCalories,
  onChangeCalories,
}) {
  return (
    <View style={{ marginTop: 16 }}>
      {/* Meal type chips */}
      <View style={styles.row}>
        {MEALS.map((meal) => {
          const active = meal === selectedMeal;
          return (
            <TouchableOpacity
              key={meal}
              onPress={() => onChangeMeal(meal)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {meal}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Calorie chips */}
      <View style={[styles.row, { marginTop: 12 }]}>
        {CALORIE_OPTIONS.map((opt) => {
          const active =
            selectedCalories &&
            selectedCalories.min === opt.value.min &&
            selectedCalories.max === opt.value.max;

          return (
            <TouchableOpacity
              key={opt.label}
              onPress={() =>
                onChangeCalories(active ? null : opt.value) // toggle
              }
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#F0F0F0",
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#FF8A00",
  },
  chipText: {
    fontSize: 14,
    color: "#505050",
  },
  chipTextActive: {
    color: "white",
    fontWeight: "600",
  },
});

// IGNORE

// import { ScrollView, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { categories, colors } from "../../Constant";

// const CategoriesFilter = () => {
//   return (
//     <View>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {categories.map((category, index) => (
//           <View
//             key={index}
//             style={[
//               styles.filterContainer,
//               { backgroundColor: index === 0 ? colors.COLOR_PRIMARY : colors.COLOR_LIGHT }
//             ]}
//           >
//             <Text style={{color: index===0 && colors.COLOR_WHITE, fontWeight: 500, fontSize: 14}}>{category.category}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default CategoriesFilter;

// const styles = StyleSheet.create({
//   filterContainer: {
//     marginTop: 18,
//     marginBottom: 18,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginRight: 12,
//   },
// });

