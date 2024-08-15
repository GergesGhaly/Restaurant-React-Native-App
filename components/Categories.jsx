import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
// import Carousel from "react-native-snap-carousel";
import logo from "../assets/images/logo.png";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

// const categoriesData = [
//   { id: "1", name: "Category 1", image: logo },
//   { id: "2", name: "Category 2", image: logo },
//   { id: "3", name: "Category 3", image: logo },
// ];

const Categories = ({ categoriesData, getCategories }) => {
  return (
    <View style={{ marginTop: 4 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoriesData?.map((item) => {
          return (
            <Pressable
              key={item.idCategory}
              style={{
                paddingHorizontal: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => getCategories(item.strCategory)}
            >
              <View
                style={{
                  padding: 6,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <Image
                  style={{ width: hp(6), height: hp(6), borderRadius: "50%" }}
                  source={item.strCategoryThumb}
                />
              </View>
              <Text style={{ fontSize: hp(1.6), color: "#4b5563" }}>
                {item.strCategory}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
