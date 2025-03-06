import globalStyle from "@/constant/constant";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

interface typeString {
  text:string;
  onPress?: any;
 
}
 
const AutoComplete = ({text,onPress}:typeString) => {

  return (
    <View>
      <GooglePlacesAutocomplete
      fetchDetails={true}
  placeholder={text}
  onPress={onPress}
  onFail={(error)=>{
    console.log("google errror",error);
    
  }}
  query={{
    key: process.env.EXPO_PUBLIC_API_KEY,
    language: "en",
  }}
  styles={{ textInputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  textInput: {
    height: 50,
    color: "black",  
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 10,
  },
  listView: {
    position: "absolute",
    top: 60, 
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5, 
    zIndex: 1
  }}}
/>

    </View>
  );
};

export default AutoComplete;

