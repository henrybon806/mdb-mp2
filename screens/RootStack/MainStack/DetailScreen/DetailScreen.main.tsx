import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./DetailScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "DetailScreen">;
  route: RouteProp<MainStackParamList, "DetailScreen">;
}

export default function DetailScreen({ route, navigation }: Props) {
  const { social } = route.params;

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("FeedScreen")} />
        <Appbar.Content title="Socials" {...({} as any)}/>
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Text style={{ ...styles.h1, marginVertical: 10}}>
            {social.title}
          </Text>
          <Text style={{ ...styles.subtitle, marginBottom: 5 }}>
            {social.location}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 5, marginBottom: 20 }}>
            {new Date(social.time.toDate()).toLocaleString()}
          </Text>
          <Image style={styles.image} source={{ uri: social.image }} />
          <Text style={styles.body}>{social.content}</Text>
          <Text style={{ ...styles.subtitle, marginVertical: 10, fontStyle: 'italic' }}>
            Created By: {social.author}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
