import globalStyle from "@/constant/constant";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface typeString {
    text?: string;
    type?: any;
    onPress?: any;
  }


function PickerImage({onPress,text}: typeString){

    return(
        <View>

        <TouchableOpacity
        onPress={onPress}
        style={globalStyle.imagePickerButton}
        >
        <Text style={globalStyle.imagePickerText}>{text}</Text>
      </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    imagePickerButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
        marginTop:8,
      },
      imagePickerText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
})


export default PickerImage