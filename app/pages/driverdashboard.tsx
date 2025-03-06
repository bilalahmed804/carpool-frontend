import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import BlueButton from "@/components/blueButton";
import globalStyle, { AppRoutes } from "@/constant/constant";
import Sheet from "@/components/sheet";
import { globalContext } from "@/context/globalContext";
import AutoComplete from "@/components/autoComplete";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete"; 
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

const DriverDashboard = () => {
  const [initialLocation, setInitialLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number, longitude: number } | null>(null);
  const [fare, setFare] = useState("");
  const [seats, setSeats] = useState("");
  const { setOpen, Open } = useContext(globalContext)
  const {user} = useContext(AuthContext)

console.log("userid",user);

  const closeSheet = () => {
    setOpen(!Open);
  };

  const handleAddRide =async() =>{
    const rideData = {
      userID : user._id,
      availableSeats :seats,
      status:"pending",
      farePerSeat :fare,
      routes :[{latitude:initialLocation?.latitude ,longitude:initialLocation?.longitude},
        {latitude: destination?.latitude, longitude:destination?.longitude}
      ],

    }
    console.log("rideDAta",rideData);
    try{
      const response = await axios.post(AppRoutes.DriverJourney , rideData)
      console.log("finally",response.data);
      
    }catch(error){
        console.log(error);
        
    }
    
  }
  console.log("area list", initialLocation?.latitude, destination?.longitude);
  


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
        <Ionicons name="menu" size={30} color="#5F9EE0" onPress={closeSheet} />
      </View>

      {Open && <Sheet />}

      <View style={styles.rideContainer}>
            <GooglePlacesAutocomplete
              fetchDetails={true}
          placeholder="Initial loaction"
          onPress={(data ,details: GooglePlaceDetail | null) => { 
            if (details?.geometry?.location) {
              const selectLatitude = details?.geometry?.location.lat;
              const selectLongitude = details?.geometry?.location.lng;
              setInitialLocation({ latitude: selectLatitude, longitude: selectLongitude });
            } else {
              console.log("No location found");
            }}}
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
            <GooglePlacesAutocomplete
              fetchDetails={true}
          placeholder="Destination loaction"
          onPress={(data ,details: GooglePlaceDetail | null) => { 
            if (details?.geometry?.location) {
              const selectLatitude = details?.geometry?.location.lat;
              const selectLongitude = details?.geometry?.location.lng;
              setDestination({ latitude: selectLatitude, longitude: selectLongitude });
            } else {
              console.log("No location found");
            }}}
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
        <BlueButton text="Add Ride" onPress={handleAddRide}/>
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
    margin: 2
  },
  container2: {
    flex: 1,
    flexDirection: "row"
  },
  farebtn: {
    width: "49%"
  }
});
