import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface typeString {
  text?: string;
  type?: any;
  onPress?: any;
}

export default function GreenButton({ text, onPress }: typeString) {
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
    backgroundColor: "#4CAF50",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
  },
});
