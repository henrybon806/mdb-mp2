import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { styles } from "./ConfirmationScreen.styles";
import { RootStackParamList } from "../RootStackScreen";
import { MainStackParamList } from "../MainStack/MainStackScreen";


interface Props {
  navigation: StackNavigationProp<MainStackParamList, "ConfirmationScreen">;
}

export default function ConfirmationScreen({ navigation }: Props) {

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.h1}>Social Has Been Confirmed</Text>
        <Text style={styles.subtitle}>Everyone can now view your social!</Text>
        <Image
          style={styles.image}
          source={require("../../../assets/mdb-logo.png")}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("FeedScreen")}
            mode="contained"
          >
            View Socials Feed
          </Button>
        </View>
      </View>
    </>
  );
}
