import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import BlueButton from "@/components/blueButton";
import globalStyle, {  AppRoutes } from "@/constant/constant";
import Sheet from "@/components/sheet";
import { globalContext } from "@/context/globalContext";
import AutoComplete from "@/components/autoComplete";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import Modal from "@/components/model";
import RoutePolyline from "@/components/pollyline";

const DriverDashboard = () => {
  const [driverInitialLocation, setDriverInitialLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [driverDestination, setDriverDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [fare, setFare] = useState("");
  const [modalVisible, setModalVisible] = useState(false)
  const [seats, setSeats] = useState("");
  const { setOpen, Open } = useContext(globalContext);
  const { user } = useContext(AuthContext);

  const closeSheet = () => {
    setOpen(!Open);
  };

  const coordinates = [
    { latitude: 24.8607, longitude: 67.0011 }, 
    { latitude: 24.8707, longitude: 67.0111 }, 
    { latitude: 24.8807, longitude: 67.0211 }, 
  ];

  const handleAddRide =async() =>{
    const modelValue = true;
    setModalVisible(true);
    const rideData = {
      userID: user._id,
      availableSeats: seats,
      status: "pending",
      farePerSeat: fare,
      routes: [
        {
          latitude: driverInitialLocation?.latitude,
          longitude: driverInitialLocation?.longitude,
        },
        {
          latitude: driverDestination?.latitude,
          longitude: driverDestination?.longitude,
        },
      ],
    };
    console.log("rideDAta", rideData);

    try{
      const response = await axios.post(AppRoutes.DriverJourney , rideData)
      console.log("finally",response.data);
      
      
    }catch(error){
        console.log(error);
        
    }
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
<RoutePolyline routeCoordinates={coordinates} />
      <View style={styles.navbar}>
        <Ionicons name="menu" size={30} onPress={closeSheet} />
      </View>

      {Open && <Sheet />}

      <View style={styles.rideContainer}>
        <AutoComplete
          onPress={(data: any, details: GooglePlaceDetail | null) => {
            if (details?.geometry?.location) {
              const initialCordinate = details?.geometry?.location;
              setDriverInitialLocation({
                latitude: initialCordinate.lat,
                longitude: initialCordinate.lng,
              });
              console.log(
                "data des",
                data.description,
                details?.geometry?.location
              );
            } else {
              console.log("no location found");
            }
          }}
          text="Enter Initial Location"
        />

        <AutoComplete
          onPress={(data: any, details: GooglePlaceDetail | null) => {
            if (details?.geometry?.location) {
              const initialCordinate = details?.geometry?.location;
              setDriverDestination({
                latitude: initialCordinate.lat,
                longitude: initialCordinate.lng,
              });
              console.log(
                "data des",
                data.description,
                details?.geometry?.location
              );
            } else {
              console.log("no location found");
            }
          }}
          text="Destination"
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
            keyboardType="number-pad"
            value={seats}
            onChangeText={setSeats}
          />
        </View>
       <Modal
        isVisible={modalVisible}
        message="Waiting for Passengers.."
        name="Driver Modal"
        fare="500"
        Vehicle="Car"
        onClose={() => setModalVisible(false)}
      />
        <BlueButton text="Add Ride" onPress={handleAddRide} />
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
  inputstyle: {
    margin: 2,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
  },
  farebtn: {
    width: "49%",
  },
});
