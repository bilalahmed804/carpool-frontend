import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; 
import Map from "@/components/Map";
import GreenButton from "@/components/greenButton";
import { globalContext } from "@/context/globalContext";
import Sheet from "@/components/sheet";
import globalStyle from "@/constant/constant";

const UserDashboard = () => {
  const [initialLocation, setInitialLocation] = useState("");
  const [destination, setDestination] = useState("");
  const { setOpen, Open } = useContext(globalContext);

  const closeSheet = () => {
    setOpen(!Open);
  };
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
        <Ionicons name="menu" size={30} color="#4CAF50" onPress={closeSheet} />
      </View>

      {Open && <Sheet />}

      <View style={styles.rideContainer}>
        <TextInput
          style={[globalStyle.input, styles.inputstyle]}
          placeholder="Enter pickup location"
          placeholderTextColor="gray"
          value={initialLocation}
          onChangeText={setInitialLocation}
        />
        <TextInput
          style={[globalStyle.input, styles.inputstyle]}
          placeholder="Enter destination"
          placeholderTextColor="gray"
          value={destination}
          onChangeText={setDestination}
        />
        <GreenButton text="search Ride" />
      </View>
    </View>
  );
};

export default UserDashboard;
