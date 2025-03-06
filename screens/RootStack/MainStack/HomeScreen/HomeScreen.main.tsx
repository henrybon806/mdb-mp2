import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./HomeScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "HomeScreen">;
  route: RouteProp<MainStackParamList, "HomeScreen">;
}

export default function HomeScreen({ route, navigation }: Props) {

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.h1}>Welcome to Socials!</Text>
        <Text style={styles.subtitle}>The best way to find socials near you</Text>
        <Image
          style={styles.image}
          source={require("../../../../assets/mdb-logo.png")}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("FeedScreen")}
            mode="contained"
          >
            View Socials
          </Button>
          <Button
            onPress={() => navigation.navigate("NewSocialScreen")}
            mode="contained"
          >
            Create a Social
          </Button>
        </View>
      </View>
    </>
  );
}
