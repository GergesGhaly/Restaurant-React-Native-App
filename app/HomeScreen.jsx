import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";
import axios from "axios";

export default function HomeScreen() {
  //Recipes states
  const [recipessData, setRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipesError, setRecipesError] = useState(null);
  const [category, setCategory] = useState("Beef");
  //serach input state
  const [firstLetter, setFirstLetter] = useState('');

  //Get Category From Categories Componnet to set in setCategory
  const getCategories = (category) => {
    setCategory(category);
  };

  // Function to fetch Recipes data from API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      setRecipesData(response.data.meals);
      setLoading(false);
      console.log("Fetched Data:", response.data.meals); // تحقق من البيانات
    } catch (err) {
      setRecipesError(err.message);
      setLoading(false);
    }
  };
  // Function to fetch Recipes ByFirst Letter data from API
  const fetchRecipesByFirstLetter = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
      );
      const meals = response.data.meals;
      if (meals && meals.length > 0) {
        setRecipesData(meals);
        setRecipesError(null);
      } else {
        setRecipesData([]);
        setRecipesError("No recipes found.");
      }
      setLoading(false);
    } catch (err) {
      setRecipesError(err.message);
      setRecipesData([]);
      setLoading(false);
    }
  };
    //categories states
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch Categories data from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategoriesData(response.data.categories); // تخزين البيانات في الحالة
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (firstLetter) {
      fetchRecipesByFirstLetter();
    } else {
      fetchRecipes();
    }
    fetchCategories();
  }, [category, firstLetter]);
  

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ position: "relative" }}
  >
    <StatusBar style="dark" />
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50, paddingTop: "3.5rem" }}
    >
      <View style={{ marginLeft: 16, marginRight: 16 }}>
        <Text style={{ fontSize: hp(3), fontWeight: 600, color: "#424242" }}>
          Kitchen
          <Text style={{ color: "#cdfa7b", fontWeight: 600 }}> Ely</Text>
        </Text>
      </View>
  
      <View
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: 20,
          padding: 6,
          marginHorizontal: 16,
            marginBottom: 8,
        }}
      >
        <TextInput
          placeholder="Search by first letter"
          placeholderTextColor="gray"
          style={{
            // marginBottom: 8,
            paddingLeft:12,
            padding: 5,
            fontSize: hp(1.7),
            borderWidth: 0,
            outlineWidth: 0,
          }}
          onChangeText={setFirstLetter}
          value={firstLetter}
        />
      </View>
  
      <View>
        <Categories
          getCategories={getCategories}
          error={error}
          categoriesData={categoriesData}
        />
      </View>
  
      <ScrollView>
        {loading ? (
          <Text
            style={{
              position: "absolute",
              top: hp(50),
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: 600,
              height: "100vh",
              backgroundColor: "#0000",
            }}
          >
            Loading...
          </Text>
        ) : recipesError ? (
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              marginTop: 20,
            }}
          >
            {recipesError}
          </Text>
        ) : recipessData && Array.isArray(recipessData) && recipessData.length > 0 ? (
          <Recipes category={category} recipessData={recipessData} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              marginTop: 20,
            }}
          >
            No recipes found.
          </Text>
        )}
      </ScrollView>
    </ScrollView>
  </ScrollView>
  
  );
}
