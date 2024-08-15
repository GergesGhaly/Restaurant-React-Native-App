import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  ReduceMotion,
  withSequence,
} from "react-native-reanimated";

import Svg, { Circle } from "react-native-svg";
import logo from "../assets/images/logo.png";
import spoon from "../assets/images/spoon.png";

export default function WelcomeScreen({}) {
  const router = useRouter();

  // Shared values for animation

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("HomeScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circleContainer]}>
        <Svg height={wp("80%")} width={wp("80%")} style={styles.svg}>
          <Circle cx="50%" cy="50%" r="40%" fill="white" opacity="0.3" />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.circleContainer]}>
        <Svg height={wp("70%")} width={wp("70%")} style={styles.svg}>
          <Circle cx="50%" cy="50%" r="30%" fill="white" opacity="0.6" />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.circleContainer]}>
        <Animated.Image source={spoon} style={styles.spoon} />
        {/* <Circle cx="50%" cy="50%" r="30%" fill="white" opacity={0.6} /> */}
      </Animated.View>

      <Animated.Image
        source={logo} // Replace with your image URL
        style={[styles.image]}
      />
      <Animated.View style={[styles.textContainer]}>
        <Text style={styles.textKitchen}>Kitchen</Text>
        <Text style={styles.textEly}>Ely</Text>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes the full height of the screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cdfa7b",
  },
  image: {
    width: wp("55%"),
    height: wp("55%"),
    resizeMode: "contain",
    zIndex: 1, // Ensures the image is above the circles
  },
  spoon: {
    width: wp("55%"),
    height: wp("55%"),
    resizeMode: "contain",
    zIndex: -5, // Ensures the image is above the circles
    // opacity: "0.7",
  },
  circleContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  svg: {
    // No need for absolute positioning here as it's already in an absolute container
  },
  textContainer: {
    position: "absolute",
    bottom: "15%", // Adjusted to better center the text on the screen
    // alignItems: "center",
    // lineHeight:"1px"
  },
  textKitchen: {
    fontSize: hp("7%"),
    fontWeight: "800",
    color: "white",
    lineHeight: "35px",
    // textShadow: "1px 4px 2px rgba(0,0,0,0.45)",
  },
  textEly: {
    fontSize: hp("10%"),
    fontWeight: "900",
    color: "white",
    textAlign: "right",
    lineHeight: "35px",
    // textShadow: "1px 4px 2px rgba(0,0,0,0.45)",
  },
});
