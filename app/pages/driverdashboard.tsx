import React, { useContext, useEffect, useId, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import globalStyle, { AppRoutes, BASE_URL } from "@/constant/constant";
import Sheet from "@/components/sheet";
import AutoComplete from "@/components/autoComplete";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { Modal } from "react-native";
import { io } from "socket.io-client";
import GreenButton from "@/components/greenButton";
import * as Location from "expo-location";

const socket = io("http://192.168.2.132:4000");

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
  const { user } = useContext(AuthContext);
  const [driverInitialLocation, setDriverInitialLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [driverDestination, setDriverDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [fare, setFare] = useState("");
  const [Open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [seats, setSeats] = useState("");
  const [intermediatePoints, setIntermediatePoints] = useState<any[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSocketConnected, setisSocketConnected] = useState(socket.connected);
  const [loading, setLoading] = useState(false);
  const [pickupAreaName, setPickupAreaName] = useState("");
  const [dropAreaName, setDropAreaName] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [userDataSoc, setUserDataSoc] = useState(null);


  const mapRef = useRef<MapView | null>(null);
interface DriverData {
  name: string;
  fare: string;
  pickupLocation: string;
  dropLocation: string;
}

const [driverData, setDriverData] = useState<DriverData | null>(null);


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

  useEffect(() => {
    socket.on("rideRequest", (userData) => {
        console.log("Received userData:", userData);
        setUserDataSoc(userData);
    });
    return () => {
        socket.off("rideRequest"); 
    };
}, []);

useEffect(() => {
  if (!userDataSoc) {
      setDriverData(null);
      return;
  }

  try {
      const parsedUserData =
          typeof userDataSoc === "string" ? JSON.parse(userDataSoc) : userDataSoc;

      setDriverData(parsedUserData);
  } catch (error) {
      console.error("Error parsing userData:", error);
      setDriverData(null);
  }
}, [userDataSoc]);
  

  const onClose = () => {
    setModalVisible(false);
  };

  const goToCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);

    if (status !== "granted") {
      alert("Location permission denied!");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const handleAddRide = async () => {
    if (!driverInitialLocation || !driverDestination) {
      ToastAndroid.show("Please select both locations.", ToastAndroid.LONG);
      return;
    }

    if (!user || !user._id) {
      return; 
    }
    const points = getIntermediatePoints(
      driverInitialLocation,
      driverDestination,
      20
    );
    setIntermediatePoints(points);

    setModalVisible(true);

    const rideData = {
      userID: user._id,
      availableSeats: seats,
      status: "pending",
      farePerSeat: fare,
      routes: [driverInitialLocation, driverDestination, ...points],
    };
    // socket.on("userData", (userData) => console.log("userData", userData))
    // console.log("rideData", userData);

    try {
      const response = await axios.post(AppRoutes.DriverJourney, rideData);
      ToastAndroid.show("Ride data posted successfully!", ToastAndroid.LONG);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting ride data:", error);

      if (axios.isAxiosError(error) && error.response) {
        ToastAndroid.show(
          `Error: ${error.response.data.message || "Something went wrong!"}`,ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show(
          "Network error! Please try again.",
          ToastAndroid.LONG
        );
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
        <Marker
          coordinate={{ latitude: 24.8607, longitude: 67.0011 }}
          title="Pickup Location"
        />
      </MapView>
      <TouchableOpacity onPress={goToCurrentLocation} />
      <View style={globalStyle.navbaruser}>
        <Sheet/>
      </View>
       <Marker coordinate={{ latitude: 24.8607, longitude: 67.0011 }} title="Pickup Location" />


      <View style={globalStyle.rideContainer}>
        <AutoComplete
          onPress={(data: any, details: GooglePlaceDetail | null) => {
            const { isInPakistan, isInKarachi } = validateLocation(details);
            if (!isInPakistan) {
              ToastAndroid.show(
                "Only locations within Pakistan are allowed.",
                ToastAndroid.LONG
              );
              return;
            }

            if (!isInKarachi) {
              ToastAndroid.show(
                "Maximum fare should be in thousands for out-of-Karachi trips.",
                ToastAndroid.LONG
              );
            }

            if (data?.description) {
              setPickupAreaName(data.description);
            }
            if (details?.geometry?.location) {
              const initialCordinate = details.geometry.location;
              setDriverInitialLocation({
                latitude: initialCordinate.lat,
                longitude: initialCordinate.lng,
              });
              console.log(
                "data des",
                data.description,
                details.geometry.location
              );
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
              ToastAndroid.show(
                "Only locations within Pakistan are allowed.",
                ToastAndroid.LONG
              );
              return;
            }

            if (!isInKarachi) {
              ToastAndroid.show(
                "Maximum fare should be in thousands for out-of-Karachi trips.",
                ToastAndroid.LONG
              );
            }
            if (data?.description) {
              setDropAreaName(data.description);
            }
            if (details?.geometry?.location) {
              const initialCordinate = details.geometry.location;
              setDriverDestination({
                latitude: initialCordinate.lat,
                longitude: initialCordinate.lng,
              });

              console.log(
                "data des",
                data.description,
                details.geometry.location
              );
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
  <View style={styles.overlayd}>
    <View style={styles.modalContainerd}>
      <TouchableOpacity onPress={onClose} style={styles.closeButtond}>
        <Ionicons name="close" size={40} color="#333" />
      </TouchableOpacity>

      <Text style={styles.message}>
        {loading ? "Loading..." : "Waiting for Passenger..."}
      </Text>
      
      <View style={styles.driverCard}>
        <View style={styles.info}>
          <Text style={styles.fare}>Ride Details</Text>
          <TouchableOpacity onPress={onClose}>
            <View style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel My Ride</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.driverCard}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#007BFF" style={styles.spinner} />
            <Text style={styles.message}>Waiting for Passenger...</Text>
          </>
        ) : (
          <>
            {userData && (
              <View style={styles.userCard}>
                <Image source={{ uri: userData.profilePic }} style={styles.userImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.named}>{userData.name}</Text>
                  <Text style={styles.detail}>Seats: {userData.seat}</Text>
                  <Text style={styles.detail}>
                    From {userData.area.latitude} to {userData.area.longitude}
                  </Text>
                </View>
              </View>
            )}
            
            {driverData && (
              <View>
                <Text style={styles.detail}>Name: {driverData.name}</Text>
                <Text style={styles.detail}>PickUp: {driverData.pickupLocation}</Text>
                <Text style={styles.detail}>Drop: {driverData.dropLocation}</Text>
                <Text style={styles.detail}>Fare: {driverData.fare}</Text>
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
                            <Text style={globalStyle.named}>
                              {userData.name}

                            </Text>
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
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonAccept}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonReject}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
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

const styles = StyleSheet.create({
  overlayd: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainerd: {
      minHeight: "90%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  closeButtond: {
    alignSelf: "flex-end",
    padding: 5,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  driverCard: {
    backgroundColor: "#C8E6C9",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  info: {
    alignItems: "center",
  },
  fare: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#388E3C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 70,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  named: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonAccept: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  buttonReject: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  spinner: {
    marginVertical: 20,
  },
});


export default DriverDashboard;