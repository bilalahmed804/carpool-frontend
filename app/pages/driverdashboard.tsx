import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // For icons
import BlueButton from "@/components/blueButton";
import globalStyle from "@/constant/constant";
import Sheet from "@/components/sheet";
import { globalContext } from "@/context/globalContext";

const DriverDashboard = () => {
  const [initialLocation, setInitialLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [seats, setSeats] = useState("");
  const { setOpen, Open } = useContext(globalContext)

  const closeSheet = () => {
    setOpen(!Open);
  };


  return (
    <View style={styles.container}>
      {/* Map Background */}
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

      {/* Navbar */}
      <View style={styles.navbar}>
        <Ionicons name="menu" size={30} color="#5F9EE0" onPress={closeSheet} />
      </View>

      {Open && ( <Sheet/>)}

      {/* Driver Input Fields */}
      <View style={styles.rideContainer}>
        <TextInput
          style={[globalStyle.input, styles.inputstyle]}
          placeholder="Initial Location"
          placeholderTextColor="gray"
          value={initialLocation}
          onChangeText={setInitialLocation}
        />
        <TextInput
          style={[globalStyle.input, styles.inputstyle]}
          placeholder="Destination"
          placeholderTextColor="gray"
          value={destination}
          onChangeText={setDestination}
        />
        <View style={styles.container2}>
        <TextInput
          style={[globalStyle.input, styles.farebtn, styles.inputstyle]}
          placeholder="Fare"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={fare}
          onChangeText={setFare}
        />
        <TextInput
          style={[globalStyle.input, styles.farebtn, styles.inputstyle]}
          placeholder="Seats Available"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={seats}
          onChangeText={setSeats}
        />

        </View>

        {/* Add Ride Button */}
        <BlueButton text="Add Ride" />
      </View>
    </View>
  );
};

export default DriverDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 2,
    color: "blue",
  },
  rideContainer: {
    position: "absolute",
    borderColor: "#5F9EE0",
    borderWidth: 2,
    bottom: 2,
    left: 2,
    right: 2,
    backgroundColor: "white",
    padding: 4,
    borderRadius: 10,
  },
  inputstyle:{
    margin:2
  },
  container2:{
    flex : 1,
    flexDirection: "row"
  },
  farebtn:{
    width: "49%"
  }
});
