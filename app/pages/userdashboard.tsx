import React, { useContext, useState } from "react";
import { View,StyleSheet,Modal,Image,TouchableOpacity,Text, ScrollView,} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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

const UserDashboard = () => {
  const [initialLocation, setInitialLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [pickupLocation, setPickupLocation ] = useState("");
  const [dropLocation, setDropLocation ] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { setOpen, Open } = useContext(globalContext);
  const { user } = useContext(AuthContext);

  const closeSheet = () => {
    setOpen(!Open);
  };

  const handleSearchRides = async () => {
    setModalVisible(true)
    const areaList = {
      userID: user._id,
      from: {
        latitude: initialLocation?.latitude,
        longitude: initialLocation?.longitude,
      },
      to: {
        latitude: destination?.latitude,
        longitude: destination?.longitude,
      },
    };
    console.log("area list", areaList);
    try {
      const response = await axios.post(AppRoutes.UserJourney, areaList);
      console.log("finally", response.data);
      router.push("/pages/searchedRides");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  
  // const handleRequest=()=>{
  //   const socket = io(BASE_URL)

  // const userData = {
  //   "name" : "abc",
  // }

  // socket.emit("userData", userData)

  // }
  const handleRequest = () => {
      const socket = io(BASE_URL)
      // socket.on("data", (payload)=>{
      //   console.log(payload);
      // })
      const userData = {
        "name": user.name,
        "picture": user.picture,
        "pickupLocationCoor": [initialLocation?.latitude, initialLocation?.longitude] ,
        "dropLocationCoor": [destination?.latitude, destination?.longitude],
        "pickupLocation": pickupLocation,
        "dropLocation": dropLocation,
        "userID": user._id
      }
    
      socket.emit("userData", userData)
    }

    
  return (
    <>
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
          <Ionicons
            name="menu"
            size={30}
            color="#4CAF50"
            onPress={closeSheet}
          />
        </View>

        {Open && <Sheet />}

        <View style={styles.rideContainer}>
          <AutoComplete
            onPress={(data: any, details: GooglePlaceDetail | null) => {
              setPickupLocation(data?.description)
              if (details?.geometry?.location) {
                const initialCordinate = details?.geometry?.location;
                setInitialLocation({
                  latitude: initialCordinate.lat,
                  longitude: initialCordinate.lng,
                });
                // console.log(
                //   "data des",
                //   data.description,
                //   details?.geometry?.location
                // );
              } else {
                console.log("no location found");
              }
            }}
            text="Enter Initial Location"
          />

          <AutoComplete
            onPress={(data: any, details: GooglePlaceDetail | null) => {
              setDropLocation(data?.description) 
              if (details?.geometry?.location) {
                const initialCordinate = details?.geometry?.location;
                setDestination({
                  latitude: initialCordinate.lat,
                  longitude: initialCordinate.lng,
                });
                // console.log(
                //   "data des",
                //   data.description,
                //   details?.geometry?.location
                // );
              } else {
                console.log("no location found");
              }
            }}
            text="Enter Destination"
          />

          <GreenButton onPress={handleSearchRides} text="search Ride" />
        </View>
      </View>


      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.message}>My Route:{} </Text>
            <View style={styles.card}>
              <Image
                source={{
                  uri: "http://res.cloudinary.com/dl4kqxuyk/image/upload/v1740661676/Ride_Sharing/Drivers/nyabkfscagusux11fxl8.jpg",
                }}
                style={styles.driverImage}
              />
              <View style={styles.info}>
                <Text style={styles.name}>name</Text>
                <Text style={styles.fare}>fare</Text>
                <Text style={styles.vehicle}>Vehicle</Text>
              </View>
              <GreenButton text="request ride" onPress={handleRequest} />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  inputstyle: {
    margin: 2,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 6,
    gap: 4,
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
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  fare: {
    fontSize: 16,
    color: "#555",
  },
  vehicle: {
    fontSize: 14,
    color: "#777",
  },
});
