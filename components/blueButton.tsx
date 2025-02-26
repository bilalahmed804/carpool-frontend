import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface typeString {
  text?: string;
  type?: any;
  onPress?: any;
}

export default function BlueButton({ text, onPress }: typeString) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "#5F9EE0",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
  },
});
