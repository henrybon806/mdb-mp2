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
  route: {
    params: {
      socialDetails: {
        title: string;
        location: string;
        description: string;
        author: string;
        eventImage: string;
        selectedDate: string;
      };
    };
  };
}

export default function ConfirmationScreen({ navigation, route }: Props) {
    const { socialDetails } = route.params;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.h1}>Social Has Been Confirmed</Text>
        <Text style={styles.subtitle}>Thanks {socialDetails.author},</Text>
        <Text style={styles.subtitle}>See you on {new Date(socialDetails.selectedDate).toLocaleString()} for {socialDetails.title}!</Text>
        <Image
          style={styles.image}
          source={{uri: socialDetails.eventImage}}
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
