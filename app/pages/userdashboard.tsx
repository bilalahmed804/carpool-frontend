import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; 
import Map from "@/components/Map";

const UserDashboard = () => {
  const [initialLocation, setInitialLocation] = useState("");
  const [destination, setDestination] = useState("");
  return (
    <View>

    <Map/>
    </View>
  );
};

export default UserDashboard;

