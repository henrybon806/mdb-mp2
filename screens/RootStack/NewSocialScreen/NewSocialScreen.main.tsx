import React, { useState, useEffect } from "react";
import { Platform, View, ScrollView, Text, Keyboard, Image } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getFileObjectAsync, uuid } from "../../../Utils";

// See https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Most of the date picker code is directly sourced from the example.
import DateTimePickerModal from "react-native-modal-datetime-picker";

// See https://docs.expo.io/versions/latest/sdk/imagepicker/
// Most of the image picker code is directly sourced from the example.
import * as ImagePicker from "expo-image-picker";
import { styles } from "./NewSocialScreen.styles";

import firebase, { getApp } from "firebase/app";
import "firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase.config";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "NewSocialScreen">;
}

export default function NewSocialScreen({ navigation }: Props) {
  /* TODO: Declare state variables for all of the attributes 
           that you need to keep track of on this screen.
    
     HINTS:

      1. There are five core attributes that are related to the social object.
      2. There are two attributes from the Date Picker.
      3. There is one attribute from the Snackbar.
      4. There is one attribute for the loading indicator in the submit button.
  
  */
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // TODO: Follow the Expo Docs to implement the ImagePicker component.
  // https://docs.expo.io/versions/latest/sdk/imagepicker/

  // TODO: Follow the GitHub Docs to implement the react-native-modal-datetime-picker component.
  // https://github.com/mmazzarolo/react-native-modal-datetime-picker

  // TODO: Follow the SnackBar Docs to implement the Snackbar component.
  // https://callstack.github.io/react-native-paper/snackbar.html

  const saveEvent = async () => {
    // TODO: Validate all fields (hint: field values should be stored in state variables).
    // If there's a field that is missing data, then return and show an error
    // using the Snackbar.

    // Otherwise, proceed onwards with uploading the image, and then the object.

    try {

      // NOTE: THE BULK OF THIS FUNCTION IS ALREADY IMPLEMENTED FOR YOU IN HINTS.TSX.
      // READ THIS TO GET A HIGH-LEVEL OVERVIEW OF WHAT YOU NEED TO DO, THEN GO READ THAT FILE!

      // (0) Firebase Cloud Storage wants a Blob, so we first convert the file path
      // saved in our eventImage state variable to a Blob.

      // (1) Write the image to Firebase Cloud Storage. Make sure to do this
      // using an "await" keyword, since we're in an async function. Name it using
      // the uuid provided below.

      // (2) Get the download URL of the file we just wrote. We're going to put that
      // download URL into Firestore (where our data itself is stored). Make sure to
      // do this using an async keyword.

      // (3) Construct & write the social model to the "socials" collection in Firestore.
      // The eventImage should be the downloadURL that we got from (3).
      // Make sure to do this using an async keyword.
      
      // (4) If nothing threw an error, then go to confirmation screen (which is a screen you must implement).
      //     Otherwise, show an error.
      if (!title || !location || !description || !author || !selectedDate || !eventImage) {
        setSnackbarMessage("Please fill in all fields");
        setSnackbarVisible(true);
        return;
      } else {
        const db = getFirestore(app);
        const socialColRef = doc(db, "Socials", uuid());
        const social = {
          title: title,
          location: location,
          content: description,
          image: eventImage,
          time: selectedDate,
          author: author,
        };
        await setDoc(socialColRef, social);
        navigation.navigate("ConfirmationScreen", {
            socialDetails: {
              title,
              location,
              description,
              author,
              eventImage,
              selectedDate,
        }});
      }
    } catch (e) {
      console.log("Error while writing social:", e);
    }
  };

  const selectImage = async () => {

     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const imgurUrl = await uploadImageToImgur(localUri);
      if (imgurUrl) {
        setEventImage(imgurUrl); 
      }
    }
  };

  const uploadImageToImgur = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any);
  
      const response = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        headers: {
          "Authorization": "Client-ID 96bf518a9e6a938",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      const data = await response.json();
      return data.success ? data.data.link : null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ ...styles.container, padding: 20 }}>
          <Text style={{ ...styles.h3, marginVertical: 10}}>Event Title:</Text>
          <TextInput
            placeholder="Title"
            onChangeText={setTitle}
          />
          <Text style={{ ...styles.h3, marginVertical: 10}}>Event Location:</Text>
          <TextInput
            placeholder="Location"
            onChangeText={setLocation}
          />
          <Text style={{ ...styles.h3, marginVertical: 10}}>Event Description:</Text>
          <TextInput
            multiline
            style={styles.descriptionInput}
            placeholder="Description"
            onChangeText={setDescription}
          />
          <Text style={{ ...styles.h3, marginVertical: 10}}>Event Image:</Text>
          <Button
              onPress={selectImage}
            >
             {eventImage ? "Change Image" : "Select Image"}
          </Button>
          {eventImage ? <Image style={{alignSelf:"center", width: "100%", height: 200}} source={{uri : eventImage}}/> : <Text style={{textAlign:"center"}}> No Image Currently Selected </Text>}
          <Text style={{ ...styles.h3, marginVertical: 10}}>Event Date and Time:</Text>
          <Button onPress={showDatePicker} >Show Date Picker</Button>
          {selectedDate ? (
            <Text style={{textAlign:"center"}}>Selected Date: {selectedDate.toLocaleDateString()} {selectedDate.toLocaleTimeString()}</Text>
          )
          :
          <Text style={{textAlign:"center"}}> No Date Currently Selected </Text>
          }
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          <Text style={{ ...styles.h3, marginVertical: 10}}>Created by:</Text>
          <TextInput
            placeholder="Author"
            onChangeText={setAuthor}
          />
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => saveEvent()}
              mode="contained"
            >
              Done
            </Button>
          </View>
          {/* Snackbar */}
        </View>
      </ScrollView>
      <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            action={{
              label: "Close",
              onPress: () => setSnackbarVisible(false),
            }}
          >
            {snackbarMessage}
        </Snackbar>
    </>
  );
}