import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator } from "react-native";
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
import { Modal } from "react-native";
import RoutePolyline from "@/components/pollyline";
import GreenButton from "@/components/greenButton";

interface UserData {
  name: string;
  profilePic: string;
  seat: number;
  area: {
    latitude: string;
    longitude: string;
  };
}
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
  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        name: "Arslan",
        profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
        seat: 2,
        area: {
          latitude: "north karachi",
          longitude: "islamabad",
        },
      });
      setLoading(false);
    }, 5000)
  }, []);

  const driverData = {
    name: "Ali Khan",
    profilePic:
      "http://res.cloudinary.com/dl4kqxuyk/image/upload/v1740661676/Ride_Sharing/Drivers/nyabkfscagusux11fxl8.jpg",
    fare: "500 PKR",
    vehicle: "Toyota Corolla",
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const closeSheet = () => {
    setOpen(!Open);
  };


  const coordinates = [
    { latitude: 24.8607, longitude: 67.0011 }, 
    { latitude: 24.8707, longitude: 67.0111 }, 
    { latitude: 24.8807, longitude: 67.0211 }, 
  ];

  const handleAddRide =async() =>{
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

    <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
    
              <Text style={styles.message}>{loading ? "massege" 
                      : "Waiting for driver to accept"}</Text>
              <View style={styles.card}>
                <Image source={{ uri: driverData.profilePic }} style={styles.driverImage} />
                <View style={styles.info}>
                  <Text style={styles.name}>{driverData.name}</Text>
                  <Text style={styles.fare}>{driverData.fare}</Text>
                  <Text style={styles.vehicle}>{driverData.vehicle}</Text>
                </View>
              </View>
              <View style={styles.card}>
                {loading ? (
                  <>
                    <ActivityIndicator size="large" color="#007BFF" style={styles.spinner} />
    
                    <Text style={styles.message}>"Wating user passanger..."</Text>
                  </>
                ) : (
                  <>
                    {/* {userData && <Image source={{ uri: userData.profilePic }} style={styles.userImage} />} */}
                    <View>
                      {userData && (
                        <View style={styles.userCard}>
                          <Image source={{ uri: userData.profilePic }} style={styles.userImage} />
                          <View>
                          <Text style={styles.name}>{userData.name}</Text>
                          <Text style={styles.detail}>Seats: {userData.seat}</Text>
                          <Text style={styles.detail}>
                            Area: Lat {userData.area.latitude}, Lng {userData.area.longitude}
                          </Text>
                          </View>
                        </View>
                      )}
                          <View style={styles.buttonAccept}>
                    <TouchableOpacity >
                      <View style={styles.buttonuser1}>
                        <Text style={styles.buttonTextuser1}>Accept</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                      <View style={styles.buttonuser}>
                        <Text style={styles.buttonTextuser}>Reject</Text>
                        </View>
                    </TouchableOpacity>
                              </View>
                    </View>
                  </>
                )}
              </View>
    
            
    <View style={styles.buttonpadding}>
 <TouchableOpacity >
      <View style={styles.button}>
        <Text style={styles.buttonText}>Cencel Ride</Text>
      </View>
    </TouchableOpacity>
 <TouchableOpacity >
      <View style={styles.button}>
        <Text style={styles.buttonText}>Start Now</Text>
      </View>
    </TouchableOpacity>
            
    </View>
            </View>
          </View>
        </Modal>
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
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    gap: 4,
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

  buttonpadding: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonAccept: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",

  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonuser: {
    backgroundColor: "red",
    padding: 20,
    fontWeight: "bold",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonuser1: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonTextuser: {
    color: "#fff",
    fontSize: 16,
  },
  buttonTextuser1: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    width: 170,
    

  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    // borderRadius:6,
    width: "100%",
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  userCard:{
    flexDirection: "row",
    height: 80,
  },
  userImage: {
    width: 60,
    height: 60,
    padding: 10,
    marginRight: 15,
    borderRadius: 30,
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
  spinner: {
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  detail: {
    fontSize: 16,
    color: "#555",
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
