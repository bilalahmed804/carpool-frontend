import React, { useContext, useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator, ToastAndroid } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import globalStyle, { AppRoutes, BASE_URL } from "@/constant/constant";
import Sheet from "@/components/sheet";
import { globalContext } from "@/context/globalContext";
import AutoComplete from "@/components/autoComplete";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { Modal } from "react-native";
import { io } from "socket.io-client";
import GreenButton from "@/components/greenButton";
import * as Location from 'expo-location';


interface UserData {
  name: string;
  profilePic: string;
  seat: number;
  area: {
    latitude: string;
    longitude: string;
  };
}

const getIntermediatePoints = (start: any, end: any, numPoints = 20) => {
  return Array.from({ length: numPoints }, (_, i) => {
    const fraction = (i + 1) / (numPoints + 1);
    return {
      latitude: start.latitude + fraction * (end.latitude - start.latitude),
      longitude: start.longitude + fraction * (end.longitude - start.longitude),
    };
  });
};

const validateLocation = (details: GooglePlaceDetail | null) => {
  const country = details?.address_components?.find((comp) =>
    comp.types.includes("country")
  )?.short_name;
  const city = details?.address_components?.find((comp) =>
    comp.types.includes("locality")
  )?.long_name;

  return {
    isInPakistan: country === "PK",
    isInKarachi: city === "Karachi",
  };
};

const DriverDashboard = () => {
  const [driverInitialLocation, setDriverInitialLocation] = useState<{latitude: number;longitude: number;} | null>(null);
  const [driverDestination, setDriverDestination] = useState<{latitude: number;longitude: number;} | null>(null);
  const [fare, setFare] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [seats, setSeats] = useState("");
  const { setOpen, Open } = useContext(globalContext);
  const { user } = useContext(AuthContext);
  const [intermediatePoints, setIntermediatePoints] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [pickupAreaName , setPickupAreaName] = useState("");
  const [dropAreaName , setDropAreaName] = useState("");
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

const mapRef = useRef<MapView | null>(null);

console.log("pickupAreaName", pickupAreaName, dropAreaName);

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        name: "Arslan",
        profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
        seat: 2,
        area: {
          latitude: "north karachi",
          longitude: "korangi",
        },
      });
      setLoading(false);
    }, 5000);
  }, []);

  const socket = io(BASE_URL)
  socket.on("userDataToDriver", (userData)=> console.log(userData))
  
  const driverData = {
    name: "Ali Khan",
    profilePic:
      "http://res.cloudinary.com/dl4kqxuyk/image/upload/v1740661676/Ride_Sharing/Drivers/nyabkfscagusux11fxl8.jpg",
    fare: "Rs.500",
    vehicle: "Toyota Corolla",
    initialLocation: "zaitoon ashraf",
    DestinationLocation: "Gulshan",
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const closeSheet = () => {
    setOpen(!Open);
  };
   const goToCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      
      if (status !== 'granted') {
        alert('Location permission denied!');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    }

  const handleAddRide = async () => {
    if (!driverInitialLocation || !driverDestination) {
      ToastAndroid.show("Please select both locations.", ToastAndroid.LONG);
      return;
    }
  
    const points = getIntermediatePoints(driverInitialLocation, driverDestination, 20);
    setIntermediatePoints(points);
  
    setModalVisible(true);
  
    const rideData = {
      userID: user._id,
      availableSeats: seats,
      status: "pending",
      farePerSeat: fare,
      routes: [
        driverInitialLocation,
        driverDestination,
        ...points,
      ],
    };
    const rideDataSend = {
      "userID": user._id,
      "availableSeats": seats,
      "status": "pending",
      "farePerSeat": fare,
      "pickupLocationCoor": [driverInitialLocation.latitude, driverInitialLocation.longitude],
      "dropLocationCoor": [driverDestination.latitude, driverDestination.longitude],
      "pickupLocation": driverInitialLocation,
      "dropLocation": driverDestination
    };
    socket.emit("driverData", rideDataSend);
    console.log("rideData", rideData);
  
    try {
      const response = await axios.post(AppRoutes.DriverJourney, rideData);
      ToastAndroid.show("Ride data posted successfully!", ToastAndroid.LONG);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting ride data:", error);
      
      if (axios.isAxiosError(error) && error.response) {
        ToastAndroid.show(`Error: ${error.response.data.message || "Something went wrong!"}`, ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Network error! Please try again.", ToastAndroid.LONG);
      }
    }
  };
  

  return (
    <View style={globalStyle.containerd}>
    <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
          showsMyLocationButton={true}
          mapType="terrain"
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 24.8607,
            longitude: 67.0011,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
       <Marker coordinate={{ latitude: 24.8607, longitude: 67.0011 }} title="Pickup Location" />

        </MapView>
        <TouchableOpacity style={globalStyle.iconButton} onPress={goToCurrentLocation}>
          <Ionicons name="locate" size={30} color="#5F9EE0" style={globalStyle.iconlocat} />
          </TouchableOpacity>
        <View style={globalStyle.navbaruser}>
      <TouchableOpacity onPress={closeSheet} style={globalStyle.iconContaineruser}>
        <Ionicons name="menu" size={30} color="#5F9EE0" />
      </TouchableOpacity>
         </View>

      {Open && <Sheet />}
      <View style={globalStyle.rideContainer}>
         <AutoComplete
  onPress={(data: any, details: GooglePlaceDetail | null) => {
    const { isInPakistan, isInKarachi } = validateLocation(details);
    if (!isInPakistan) {
      ToastAndroid.show("Only locations within Pakistan are allowed.", ToastAndroid.LONG);
      return;
    }
    
    if (!isInKarachi) {
      ToastAndroid.show("Maximum fare should be in thousands for out-of-Karachi trips.", ToastAndroid.LONG);
    }
  
    if (data?.description) {
      setPickupAreaName(data.description)
    }
    if (details?.geometry?.location) {
      const initialCordinate = details.geometry.location;
      setDriverInitialLocation({
        latitude: initialCordinate.lat,
        longitude: initialCordinate.lng,
      });
      console.log("data des", data.description, details.geometry.location);
    } else {
      console.log("no location found");
    }
  }}
  text="Enter Initial Location"
/>

<AutoComplete
  onPress={(data: any, details: GooglePlaceDetail | null) => {
    const { isInPakistan, isInKarachi } = validateLocation(details);
    if (!isInPakistan) {
      ToastAndroid.show("Only locations within Pakistan are allowed.", ToastAndroid.LONG);
      return;
    }
    
    if (!isInKarachi) {
      ToastAndroid.show("Maximum fare should be in thousands for out-of-Karachi trips.", ToastAndroid.LONG);
    }
    if(data?.description){
      setDropAreaName(data.description)}
    if (details?.geometry?.location) {
      const initialCordinate = details.geometry.location;
      setDriverDestination({
        latitude: initialCordinate.lat,
        longitude: initialCordinate.lng,
      });

      console.log("data des", data.description, details.geometry.location);
    } else {
      console.log("no location found");
    }
  }}
  text="Destination"
/>

         
          <View style={globalStyle.fareContainer}>
            <TextInput
              style={globalStyle.inputField}
              placeholder="Fare"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={fare}
              onChangeText={setFare}
            />
            <TextInput
              style={globalStyle.inputField}
              placeholder="Seats Available"
              placeholderTextColor="gray"
              keyboardType="number-pad"
              value={seats}
              onChangeText={setSeats}
            />
          </View>
          <GreenButton text="Add Ride" onPress={handleAddRide} />
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={globalStyle.overlayd}>
            <View style={globalStyle.modalContainerd}>
              <TouchableOpacity onPress={onClose} style={globalStyle.closeButtond}>
                <Ionicons name="close" size={40} color="#333" />
              </TouchableOpacity>

              <Text style={globalStyle.message}>
                {loading ? "massege" : "Waiting for Passanger..."}
              </Text>
              <View style={globalStyle.driverCard}>
                <View style={globalStyle.info}>
                  <Text style={globalStyle.fare}>
                    {driverData.fare} {" - "} {driverData.initialLocation} to{" "}
                    {driverData.DestinationLocation}
                  </Text>
                  <TouchableOpacity
                    onPress={onClose}
                  >
                    <View style={globalStyle.buttond}>
                      <Text style={globalStyle.buttonTextd}>Cancel My Ride</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={globalStyle.driverCard}>
                {loading ? (
                  <>
                    <ActivityIndicator
                      size="large"
                      color="#007BFF"
                      style={globalStyle.spinner}
                    />

                    <Text style={globalStyle.messaged}>
                      "Wating user passanger..."
                    </Text>
                  </>
                ) : (
                  <>
                    <View>
                      {userData && (
                        <View style={globalStyle.userCard}>
                          <Image
                            source={{ uri: userData.profilePic }}
                            style={globalStyle.userImage}
                          />
                          <View style={globalStyle.userInfo}>
                            <Text style={globalStyle.named}>{userData.name}</Text>
                            <Text style={globalStyle.detail}>
                              Seats: {userData.seat}
                            </Text>
                            <Text style={globalStyle.detail}>
                              from {userData.area.latitude} to {""}
                              {userData.area.longitude}
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={globalStyle.buttonRow}>
                        <TouchableOpacity style={globalStyle.buttonAccept}>
                          <Text style={globalStyle.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyle.buttonReject}>
                          <Text style={globalStyle.buttonTextd}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default DriverDashboard;