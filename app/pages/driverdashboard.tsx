import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator, ToastAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import BlueButton from "@/components/blueButton";
import globalStyle, { AppRoutes } from "@/constant/constant";
import Sheet from "@/components/sheet";
import { globalContext } from "@/context/globalContext";
import AutoComplete from "@/components/autoComplete";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { Modal } from "react-native";
import RoutePolyline from "@/components/pollyline";

interface UserData {
  name: string;
  profilePic: string;
  seat: number;
  area: {
    latitude: string;
    longitude: string;
  };
}

const getIntermediatePoints = (start: any, end: any, numPoints = 4) => {
  let points = [];

  for (let i = 1; i <= numPoints; i++) {
    const fraction = i / (numPoints + 1);

    const lat = start.latitude + fraction * (end.latitude - start.latitude);
    const lng = start.longitude + fraction * (end.longitude - start.longitude);

    points.push({ latitude: lat, longitude: lng });
  }
console.log("points",points);

  return points;
};

const checkLocationValidity = (details: GooglePlaceDetail | null) => {
  const country = details?.address_components?.find((comp) =>
    comp.types.includes("country")
  )?.short_name;
  console.log("country", country);
  
  return country === "PK"; 
};

const checkIfOutOfKarachi = (details: GooglePlaceDetail | null) => {
  const city = details?.address_components?.find((comp) =>
    comp.types.includes("locality")
  )?.long_name;
  console.log("city", city);
  
  return city !== "Karachi"; 
};
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
  const [modalVisible, setModalVisible] = useState(false);
  const [seats, setSeats] = useState("");
  const { setOpen, Open } = useContext(globalContext);
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [intermediatePoints, setIntermediatePoints] = useState<any[]>([]);
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
          longitude: "korangi",
        },
      });
      setLoading(false);
    }, 5000);
  }, []);

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

  const coordinates = [
    { latitude: 24.8607, longitude: 67.0011 },
    { latitude: 24.8707, longitude: 67.0111 },
    { latitude: 24.8807, longitude: 67.0211 },
  ];

  const handleAddRide =async() =>{
      
    getIntermediatePoints(driverInitialLocation, driverDestination, 4);

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

    try {
      const response = await axios.post(AppRoutes.DriverJourney, rideData);
      console.log("finally", response.data);
    } catch (error) {
      console.log(error);
    }
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
      <RoutePolyline routeCoordinates={coordinates} />
      <View style={styles.navbar}>
        <Ionicons
          name="menu"
          size={40}
          onPress={closeSheet}
          color={"#5F9EE0"}
        />
      </View>

      {Open && <Sheet />}
      <View style={styles.rideContainer}>
         <AutoComplete
  onPress={(data: any, details: GooglePlaceDetail | null) => {
    if (!checkLocationValidity(details)) {
      ToastAndroid.show("Only locations within Pakistan are allowed.", ToastAndroid.LONG);
      return;
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
    if (!checkLocationValidity(details)) {
      ToastAndroid.show("Only locations within Pakistan are allowed.", ToastAndroid.LONG);
      return;
    }

    if (details?.geometry?.location) {
      const initialCordinate = details.geometry.location;
      setDriverDestination({
        latitude: initialCordinate.lat,
        longitude: initialCordinate.lng,
      });

      if (checkIfOutOfKarachi(details)) {
        ToastAndroid.show("Maximum fare should be in thousands for out-of-Karachi trips.", ToastAndroid.LONG);
      }

      console.log("data des", data.description, details.geometry.location);
    } else {
      console.log("no location found");
    }
  }}
  text="Destination"
/>

          />
         
          <View style={styles.fareContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Fare"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={fare}
              onChangeText={setFare}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Seats Available"
              placeholderTextColor="gray"
              keyboardType="number-pad"
              value={seats}
              onChangeText={setSeats}
            />
          </View>
          <BlueButton text="Add Ride" onPress={handleAddRide} />
        </View>
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={40} color="#333" />
              </TouchableOpacity>

              <Text style={styles.message}>
                {loading ? "massege" : "Waiting for Passanger..."}
              </Text>
              <View style={styles.driverCard}>
                <View style={styles.info}>
                  <Text style={styles.fare}>
                    {driverData.fare} {" - "} {driverData.initialLocation} to{" "}
                    {driverData.DestinationLocation}
                  </Text>
                  <TouchableOpacity
                    onPress={onClose} //temprary on close
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Cancel My Ride</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.driverCard}>
                {loading ? (
                  <>
                    <ActivityIndicator
                      size="large"
                      color="#007BFF"
                      style={styles.spinner}
                    />

                    <Text style={styles.message}>
                      "Wating user passanger..."
                    </Text>
                  </>
                ) : (
                  <>
                    <View>
                      {userData && (
                        <View style={styles.userCard}>
                          <Image
                            source={{ uri: userData.profilePic }}
                            style={styles.userImage}
                          />
                          <View style={styles.userInfo}>
                            <Text style={styles.name}>{userData.name}</Text>
                            <Text style={styles.detail}>
                              Seats: {userData.seat}
                            </Text>
                            <Text style={styles.detail}>
                              from {userData.area.latitude} to {""}
                              {userData.area.longitude}
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.buttonAccept}>
                          <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonReject}>
                          <Text style={styles.buttonText}>Reject</Text>
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
    padding: 8,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    gap: 2,
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
  button: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  buttonAccept: {
    backgroundColor: "#28a745",
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  inputCard: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  fareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#CCC",
  },

  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  driverCard: {
    flexDirection: "row",
    borderEndEndRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 20,
    backgroundColor: "",
    width: "100%",
    elevation: 5,
    borderColor: "gray",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 5,
    width: "100%",
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  userInfo: { flex: 1 },
  detail: { fontSize: 17, fontWeight: "500", color: "#666" },
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
  },
  fare: {
    fontSize: 18,
    justifyContent: "space-between",
    fontWeight: "500",
    marginRight: 20,
    color: "#555",
  },
});
