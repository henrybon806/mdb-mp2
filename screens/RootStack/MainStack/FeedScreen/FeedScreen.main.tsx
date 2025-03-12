import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { app } from "../../../../firebase.config";
import { getFirestore, doc, query, orderBy, onSnapshot, collection, Timestamp } from "firebase/firestore";
import { styles } from "./FeedScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";
import { SocialData } from "../../../../models/social";

/* HOW TYPESCRIPT WORKS WITH PROPS:

  Remember the navigation-related props from Project 2? They were called `route` and `navigation`,
  and they were passed into our screen components by React Navigation automatically.  We accessed parameters 
  passed to screens through `route.params` , and navigated to screens using `navigation.navigate(...)` and 
  `navigation.goBack()`. In this project, we explicitly define the types of these props at the top of 
  each screen component.

  Now, whenever we type `navigation.`, our code editor will know exactly what we can do with that object, 
  and it'll suggest `.goBack()` as an option. It'll also tell us when we're trying to do something 
  that isn't supported by React Navigation! */

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
}

export default function FeedScreen({ navigation }: Props) {
  const [socials, setSocials] = useState<SocialData[]>([]);
  const db = getFirestore(app);
  const socialColRef = collection(db, "Socials");

  /* TYPESCRIPT HINT: 
    When we call useState(), we can define the type of the state
    variable using something like this:
        const [myList, setMyList] = useState<MyModelType[]>([]); */

  /*
    TODO: In a useEffect hook, start a Firebase observer to listen to the "socials" node in Firestore.
    Read More: https://firebase.google.com/docs/firestore/query-data/listen
  
    Reminders:
      1. Make sure you start a listener that's attached to this node!
      2. The onSnapshot method returns a method. Make sure to return the method
          in your useEffect, so that it's called and the listener is detached when
          this component is killed. 
          Read More: https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
      3. You'll probably want to use the .orderBy method to order by a particular key.
      4. It's probably wise to make sure you can create new socials before trying to 
          load socials on this screen.
  */

  const renderItem = ({ item }: { item: SocialData }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("DetailScreen", { social: item })}>
        <Card style={styles.card}>
          <Card.Title 
            title={item.title} 
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
          />
          <Card.Content>
            {item.image ? (
              <Image 
                source={{ uri: item.image }} 
                style={styles.cardImage} 
              />
            ) : (
              <Image 
                style={styles.cardImage} 
                source={require("../../../../assets/social.jpeg")}
              />
            )}
            <Text style={styles.cardTime}>
              {item.time instanceof Timestamp
              ? new Date(item.time.toDate()).toLocaleString()
              : item.time}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const socialsQuery = query(
      socialColRef, 
      orderBy("time", "asc") 
    );

    const unsub = onSnapshot(socialsQuery, (snapshot) => {
      const socialsData = snapshot.docs.map( (doc) => ({
        id: doc.id,
        title: doc.data().title,
        author: doc.data().author,
        content: doc.data().content,
        image: doc.data().image,
        time: doc.data().time,
        location: doc.data().location,
      }));
      setSocials(socialsData);
    });
    return () => unsub();
  }, []);

  const NavigationBar = () => {
    return (      
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.navigate("HomeScreen")} />
        <Appbar.Content title="All Socials"/>
        <Appbar.Action icon="plus" onPress={() => navigation.navigate("NewSocialScreen")} />
      </Appbar.Header>
    );
  };

  return (
    <>
      {/* Embed your NavigationBar here. */}
      <NavigationBar />
      <View style={styles.container}>
        {/* Return a FlatList here. You'll need to use your renderItem method. */}
          {socials.length === 0 ? (
          <Text style={{ ...styles.h3, textAlign:"center", marginTop:20}}>No Socials To Display</Text>
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {socials.map((item) => (
              <View key={item.id}>{renderItem({ item })}</View>
            ))}
          </ScrollView>
        ) }
      </View>
    </>
  );
}
