import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome"; // التأكد من استيراد Icon بشكل صحيح
import { useNavigation } from "expo-router";

const RecipeDetails = () => {
  const route = useRoute();
  const { id } = route.params || {}; // التأكد من وجود المعاملات
  const [recipe, setRecipe] = useState(null);
  const navigation = useNavigation();
  console.log("first", id);
  useEffect(() => {
    const fetchRecipe = async () => {
      // if (id) {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals ? response.data.meals[0] : null); // تحقق من وجود meals
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // استخراج المكونات والخطوات
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  const HandelGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.backButton} onPress={HandelGoBack}>
        <Icon name="arrow-left" size={24} color="#cdfa7b" />
      </Pressable>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Text style={styles.subtitle}>Category: {recipe.strCategory}</Text>
      <Text style={styles.subtitle}>Area: {recipe.strArea}</Text>

      <Text style={styles.heading}>Ingredients:</Text>
      {ingredients.length > 0 ? (
        ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredient}>
            <Text style={styles.dot}>-</Text> {item.ingredient} - {item.measure}
          </Text>
        ))
      ) : (
        <Text style={styles.noDataText}>No ingredients available</Text>
      )}

      <Text style={styles.heading}>Instructions:</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginVertical: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  ingredient: {
    fontSize: 15,
    marginVertical: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#cdfa7b",
    color: "#cdfa7b",
  },
  instructions: {
    fontSize: 15,
    marginVertical: 8,
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
  },
});

export default RecipeDetails;
