import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; 
import GreenButton from "@/components/greenButton";
import { globalContext } from "@/context/globalContext";
import Sheet from "@/components/sheet";
import globalStyle from "@/constant/constant";
import AreaCordinate from "@/components/areaCordinate";
import { useRouter } from "expo-router";


const UserDashboard = () => {
  const router = useRouter()
  const [initialLocation, setInitialLocation] = useState("");
  const [destination, setDestination] = useState("");
  const { setOpen, Open } = useContext(globalContext);
  
  const closeSheet = () => {
    setOpen(!Open);
  };
  
  const handleSearchRides =() => {
    router.push("/pages/searchedRides")
  }


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
        <AreaCordinate/>
        <GreenButton onPress={handleSearchRides} text="search Ride" />
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
    padding: 2,
    color: "blue",
  },
  rideContainer: {
    position: "absolute",
    borderColor: "#4CAF50",
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

});