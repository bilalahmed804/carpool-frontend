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
import globalStyle, { AppRoutes } from "@/constant/constant";
import AutoComplete from "@/components/autoComplete";
import { useRouter } from "expo-router";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

const UserDashboard = () => {
  const router = useRouter()
  const [initialLocation, setInitialLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const { setOpen, Open } = useContext(globalContext);
  const { user } = useContext(AuthContext);

  console.log("user id=>",user);
  
  
  const closeSheet = () => {
    setOpen(!Open);
  };

  
  
  const handleSearchRides =async() => {
    const areaList = {
      userID : user._id,
      from :{latitude:initialLocation?.latitude ,longitude:initialLocation?.longitude},
      to: {latitude: destination?.latitude, longitude:destination?.longitude}
    }
    console.log("area list", areaList);
    try{
      const response = await axios.post(AppRoutes.UserJourney , areaList)
      console.log("finally",response.data);
      router.push("/pages/searchedRides")
      
    }catch(error:any){
        console.log(error.message);
        
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
      <View style={styles.navbar}>
        <Ionicons name="menu" size={30} color="#4CAF50" onPress={closeSheet} />
      </View>

      {Open && <Sheet />}

      <View style={styles.rideContainer}>
        <AutoComplete
          onPress={(data:any, details:GooglePlaceDetail | null) => {
            if (details?.geometry?.location) {
              const initialCordinate = details?.geometry?.location;              
            setInitialLocation({
              latitude: initialCordinate.lat,
              longitude: initialCordinate.lng,
            });
            console.log("data des",data.description, details?.geometry?.location);
            
          }else{
            console.log("no location found");
          }} }
          text="Enter Initial Location" />

        <AutoComplete
          onPress={(data:any, details:GooglePlaceDetail | null) => {
            if (details?.geometry?.location) {
              const initialCordinate = details?.geometry?.location; 
            setDestination({
              latitude: initialCordinate.lat,
              longitude: initialCordinate.lng,
            });
            console.log("data des",data.description, details?.geometry?.location);
          }
          else{
            console.log("no location found");
          }}}
          text="Enter Destination" />

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