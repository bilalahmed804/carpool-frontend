import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; 

const UserDashboard = () => {
  const [initialLocation, setInitialLocation] = useState("");
  const [destination, setDestination] = useState("");
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 24.8607,
          longitude: 67.0011,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />
      <View style={styles.navbar}>
        <Ionicons name="menu" size={30} color="#007BFF" />
      </View>

      <View style={styles.rideContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          placeholderTextColor="gray"
          value={initialLocation}
          onChangeText={setInitialLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          placeholderTextColor="gray"
          value={destination}
          onChangeText={setDestination}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Search Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 10,
    paddingTop: 20,
    color:"blue",
  },

  rideContainer: {
    position: "absolute",
   borderColor:"#007BFF",
   borderWidth:2,
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
