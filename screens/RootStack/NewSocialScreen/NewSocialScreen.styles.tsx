import { StyleSheet } from "react-native";
import { AppStyles } from "../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  descriptionInput: {
    width: "100%",
    height: 150, 
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: "top", 
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    gap: 10, 
  },
});