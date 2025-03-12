import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 5, 
    backgroundColor: "#fff", 
  },
  cardImage: {
    width: "100%", 
    height: 200, 
    borderRadius: 8, 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", 
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#777", 
  },
  cardContent: {
    fontSize: 16,
    color: "#444",
    marginVertical: 8, 
  },
  cardTime: {
    fontSize: 12,
    color: "#888", 
    marginTop: 12, 
  },
});
