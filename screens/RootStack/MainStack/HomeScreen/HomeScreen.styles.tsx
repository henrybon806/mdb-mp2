import React from "react";
import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  view: {
    flex: 1,
    margin: 20,
  },
  subtitle: {
    color: "gray",
  },
  image: {
    width: "100%",
    height: undefined, 
    aspectRatio: 8 / 9,
    resizeMode: "cover",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    
    padding: 20,
  },
  
  buttonContainer: {
    width: "100%",
    gap: 10, 
  },
});
