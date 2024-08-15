import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";

export default function Recipes({ recipessData, category }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <Text style={{ color: "#4b5563", fontSize: 24, marginTop: 8,marginBottom: 8 }}>
        {category}
      </Text>
      <View style={styles.container}>
        {recipessData.map((item) => (
          <RecipeCard key={item.idMeal} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  container: {
    flexGrow: 1,
  },
});
