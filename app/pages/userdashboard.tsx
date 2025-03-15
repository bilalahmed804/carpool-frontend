import React, { useContext, useEffect, useRef, useState } from "react";
import {View,StyleSheet,Modal,Image,TouchableOpacity,Text, ToastAndroid,} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import GreenButton from "@/components/greenButton";
import { globalContext } from "@/context/globalContext";
import Sheet from "@/components/sheet";
import { AppRoutes, BASE_URL } from "@/constant/constant";
import AutoComplete from "@/components/autoComplete";
import { useRouter } from "expo-router";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { io } from "socket.io-client";
import BlueButton from "@/components/blueButton";
import * as Location from 'expo-location';

const socket = io(BASE_URL);

const UserDashboard = () => {
  const { setModalOpen, modalOpen } = useContext(globalContext);
  const { user } = useContext(AuthContext); 
  const [Open, setOpen] = useState(false);
  const [initialLocation, setInitialLocation] = useState<{latitude: number;longitude: number;} | null>(null);
  const [destination, setDestination] = useState<{latitude: number;longitude: number;} | null>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [driverID, setDriverID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState([]);
  const [journeyExpense, setJourneyExpense] = useState([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isSocketConnected, setisSocketConnected] = useState(socket.connected);
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  
  useEffect(() => {
      socket.connect();
      socket.on("connect", () => {
        console.log("Socket connected");
        setisSocketConnected(true);
      });
      socket.on("disconnect", () => setisSocketConnected(false));
      return () => {
        socket.disconnect();
      };
    }, []);

  // Socket : Step 1
  if (user && user._id) {
    const userID = { userID: user._id };
    socket.emit("registerUser", userID);
  }

  const closeModal = () => {
    setModalOpen(!modalOpen);
  };

  const goToCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);
    
    if (status !== 'granted') {
      ToastAndroid.show("Permission to access location was denied", ToastAndroid.SHORT);
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

  const handleSearchRides = async () => {
    if (!user || !user._id) {
      return; 
    }
    const areaList = {
      userID: user._id,
      from: {latitude: initialLocation?.latitude,longitude: initialLocation?.longitude,},
      to: {latitude: destination?.latitude,longitude: destination?.longitude,},
    };
    try {
      const response = await axios.post(AppRoutes.UserJourney, areaList);
      console.log("finally", response.data.data);
      setJourneyExpense(response.data.data.rideExpense);
      setModalOpen(true);
    } catch (error: any) {
      console.log("error in searching ride from user Dashboard==>", error.message);
    }
  };

  const collectDriverDetails = async (userID: any) => {
    setDriverID(userID)
    try {
      const response = await axios.post(AppRoutes.getDynamicDriver, {id: userID});
      console.log("driverDetail", response.data.data);
      setSelectedDriver(response.data.data);
      setModalVisible(true);
    } catch (error: any) {
      console.log("error in collecting driver details==>", error.message);
    }
  }
  

  // Socket : Step 2
  const handleSocketRequest = () => {
    if (!user || !user._id) {
      return; 
    }
    const userData = {
      name: user.name,
      picture: user.picture,
      pickupLocationCoor: [
        initialLocation?.latitude,
        initialLocation?.longitude,
      ],
      dropLocationCoor: [destination?.latitude, destination?.longitude],
      pickupLocation: pickupLocation,
      dropLocation: dropLocation,
      driver_ID : driverID,
      userID: user._id
    };
    socket.emit("userRequestToDriver", userData)
  };

  return (
    <>
      <View style={styles.containeruser}>
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
        <TouchableOpacity onPress={goToCurrentLocation} />
        <View style={styles.navbaruser}>
      <Sheet/>
    </View>
   

        <View style={styles.rideContaineruser}>
          <AutoComplete
            onPress={(data: any, details: GooglePlaceDetail | null) => {
              setPickupLocation(data?.description);
              if (details?.geometry?.location) {
                const initialCordinate = details?.geometry?.location;
                setInitialLocation({
                  latitude: initialCordinate.lat,
                  longitude: initialCordinate.lng,
                });
              } else {
                console.log("no location found");
              }
            }}
            text="Enter Initial Location"
          />

          <AutoComplete
            onPress={(data: any, details: GooglePlaceDetail | null) => {
              setDropLocation(data?.description);
              if (details?.geometry?.location) {
                const initialCordinate = details?.geometry?.location;
                setDestination({
                  latitude: initialCordinate.lat,
                  longitude: initialCordinate.lng,
                });
              } else {
                console.log("no location found");
              }
            }}
            text="Enter Destination"
          />

          <BlueButton onPress={handleSearchRides} text="search Ride" />
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay1}>        
        <View style={styles.popupContainer}>
          <View style={styles.closeButtonuser}>
            <TouchableOpacity>
              <Ionicons size={30} name="close" onPress={() => setModalVisible(false)} />
            </TouchableOpacity>
          </View>
          {selectedDriver.map((data: any, index: number) => (
          <View key={index}>
          <View style={styles.header}>
            <Image
              source={{uri : data.profileImage}}
              alt="CP"
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={{fontSize: 26,fontWeight:"bold", textAlign: "center"}}>{data.name}</Text>
            <Text style={{fontSize: 20,fontWeight:"bold", textAlign: "center"}}>{data.gender}</Text>
            <Text style={{fontSize: 20,fontWeight:"bold", textAlign: "center"}}>{data.vehicleCategory}</Text>
            <Text style={{fontSize: 20,fontWeight:"bold", textAlign: "center"}}>Vehicle No : {data.vehicleNo}</Text>
            <Text style={{fontSize: 20,fontWeight:"bold", textAlign: "center"}}>License No : {data.licenseNo}</Text>
          <View style={styles.btn}>
            <Ionicons name="call-outline" size={34} onPress={closeModal} />
            <Ionicons name="logo-whatsapp" size={34} onPress={closeModal} />
        </View>
            <View>
            <GreenButton onPress={handleSocketRequest} text="request ride" />
            </View>
          </View>
          </View>
          ))}
          </View>
        </View>
        </Modal>

      {modalOpen && 
        <View style={styles.overlay1}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              style={styles.closeButtonuser}
            >
              <Ionicons name="close" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.messageuser}>My Route:{} </Text>
            {journeyExpense.map((data: any, index: number) => (
              <View key={index} style={styles.carduser}>
                <View style={styles.infouser}>
                  <Text style={styles.nameuser}>
                    Available Seats : {data.availableSeats}
                  </Text>
                  <Text style={styles.fareuser}>
                    Fare Per Seat : {data.farePerSeat}
                  </Text>
                </View>
                <GreenButton text="Details" onPress={() => collectDriverDetails(data.userID)}/>
              </View>
            ))}
          </View>
        </View>
        }
    </>
  );
};

export default UserDashboard;
const styles = StyleSheet.create({
  containeruser: {
    flex: 1,
  },
  navbaruser: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  rideContaineruser: {
    position: "absolute",
    borderColor: "#5F9EE0",
    borderWidth: 2,
    bottom: 2,
    left: 2,
    right: 2,
    backgroundColor: "white",
    padding: 6,
    borderRadius: 12,
  },
  inputstyleuser: {
    margin: 2,
    borderWidth: 1,
    borderColor: "#5F9EE0",
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#F0F8FF",
  },
  overlayuser: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  overlay1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 6,
    gap: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: "95%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButtonuser: {
    alignSelf: "flex-end",
    padding: 8,
  },
  messageuser: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  carduser: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  driverImageuser: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#5F9EE0",
  },
  infouser: {
    flex: 1,
  },
  nameuser: {
    fontSize: 22,
    fontWeight: "bold",
  },
  fareuser: {
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  vehicleuser: {
    fontSize: 14,
    color: "#777",
  },
  popupContainer: {
    flex: 1,
    width : "80%",
    height : "70%",
    position: "absolute",
    borderRadius: 10,
    marginVertical: "auto",
    marginHorizontal: "auto",
    backgroundColor: "white",
    elevation: 6,
    zIndex: 1000,
    padding: 10
  },
  infoContainer:{
    gap: 12,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    margin: 20,
  },
  btn: {
    flexDirection: "row",
    gap: 30,
    marginVertical : 10,
    justifyContent: "space-around",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  buttonAccept: {
    backgroundColor: "#5F9EE0",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  buttonReject: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  locationButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#5F9EE0',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  nameStyle: {
    fontSize: 16,
    color: "#555",
  },
});
