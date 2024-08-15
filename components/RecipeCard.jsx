import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import logo from "../assets/images/logo.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "expo-router";

export default function RecipeCard({ item }) {
  const Navigation = useNavigation();
  const handlePress = () => {
    // Navigate to RecipeDetails screen and pass the id
    Navigation.navigate("productDetailsScreen", { id: item.idMeal });
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Pressable
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
        onPress={handlePress}
      >
        <Image source={item.strMealThumb} style={styles.image} />
        <Text
          style={{
            fontWeight: "600",
            marginLeft: 8,
            marginTop: 6,
            fontSize: hp(1.5),
            color: "#4b5563",
          }}
        >
          {item.strMeal}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    color: "#4b5563",
    fontWeight: "600",
    marginLeft: 8,
  },
});
