import React, { useContext, useEffect, useRef, useState } from "react";
import {View,TextInput,StyleSheet,TouchableOpacity,Text,ToastAndroid,} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
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
import LottieView from "lottie-react-native";

const socket = io(BASE_URL);
// const socket = io("http://192.168.7.236:4000");


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

function DriverDashboard() {
  const { user } = useContext(AuthContext);
  const [driverInitialLocation, setDriverInitialLocation] = useState<{latitude: number;longitude: number;} | null>(null);
  const [driverDestination, setDriverDestination] = useState<{latitude: number;longitude: number;} | null>(null);
  const [fare, setFare] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [seats, setSeats] = useState("");
  const [intermediatePoints, setIntermediatePoints] = useState<any[]>([]);
  const [isSocketConnected, setisSocketConnected] = useState(socket.connected);
  const [loading, setLoading] = useState(false);
  const [isRideAccepted, setIsRideAccepted] = useState(false);
  const [pickupAreaName, setPickupAreaName] = useState("");
  const [connectedUserID, setConnectedUserID] = useState("");
  const [dropAreaName, setDropAreaName] = useState("");
  const [userLiveLocation, setUserLiveLocation] = useState<{latitude: number; longitude: number;} | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );
  const [driverData, setDriverData] = useState<any | []>([]);

  const mapRef = useRef<MapView | null>(null);

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

  //Socket : Step : 2
  useEffect(() => {
    // Listen for new ride updates
    socket.on("rideRequest", (userData) => {
      setDriverData((prev: any) => [...prev, userData]);
      setLoading(false);
    });
    return () => {
      socket.off("rideUpdate"); // Cleanup listener on unmount
    };
  }, [socket.on]);

  // Socket : Step 3
  const acceptUserRequest = async (requestee: any) => {
    setConnectedUserID(requestee)
    try {
      if (!user || !user._id) {
        return console.log("user ka data nahin he");
      }
      const userData = {
        name: user.name,
        requesteeID: requestee,
        driver_ID: user._id,
      };
      socket.emit("DriverResponse_Accept", userData);
      setIsRideAccepted(true)
      setModalVisible(false)
      sendMyLocation();
    } catch (error) {
      console.log("Location fetching failed:", error);
    }
  };

  const rejectUserRequest = (requestee: any) => {
    const userData = {
      requesteeID: requestee,
      message: "Ride Rejected",
    };
    socket.emit("DriverResponse_Reject", userData);
    console.log("Data Emitted");
  };

 // Socket : Step 4 (reciving driver live location)
  useEffect(() => {
    socket.on("userLocation", (data: any) => {
      setUserLiveLocation({
        latitude: data.liveLocation.coords.latitude,
        longitude: data.liveLocation.coords.longitude,
      });
      console.log("(137) user Live Location set in stat :", userLiveLocation);

    });
  }, [location]);

  //Socket : Step 5 (driver is sending its live location on its backend)
  useEffect(() => {
    if (isRideAccepted) {  
      const obj = {
        liveLocation : location,
        userID: connectedUserID
      }
      socket.emit("driverLiveLocation", obj);
    }
  }, [location]);

  const onClose = () => {
    setModalVisible(false);
    setDriverData([]);
  };

  const sendMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location Permission Status:", status);
  
    if (status !== "granted") {
      alert("Location permission denied!");
      return;
    }
    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 2,
      },
      (newLocation) => {
        // Ensure newLocation is valid
        if (newLocation?.coords?.latitude && newLocation?.coords?.longitude) {
          setLocation(newLocation);  // Update only when valid location is received
          // console.log("(162) - driver Live Location=>",newLocation);
          
          
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        } else {
          console.log("Invalid location data received, ignoring update.");
        }
      }
    );
  };

  const goToCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
  
      if (status !== "granted") {
        alert("Location permission denied!");
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // High accuracy ke liye
      });
  
      console.log("Current Location:", location);
  
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  

  const stopLocationTracking = () => {
  if (locationSubscription.current) {
      locationSubscription.current.remove(); // Tracking stop karo
      locationSubscription.current = null;   // Reference clear karo
      console.log(" Location tracking stopped.");
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
    setLoading(true)
    const rideData = {
      userID: user._id,
      availableSeats: seats,
      status: "pending",
      farePerSeat: fare,
      routes: [driverInitialLocation, driverDestination, ...points],
    };
    try {
      const response = await axios.post(AppRoutes.DriverJourney, rideData);
      ToastAndroid.show("Ride data posted successfully!", ToastAndroid.LONG);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting ride data:", error);
      if (axios.isAxiosError(error) && error.response) {
        ToastAndroid.show(
          `Error: ${error.response.data.message || "Something went wrong!"}`,
          ToastAndroid.LONG
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
    <>
      <View style={globalStyle.containerd}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsTraffic={true}
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

        <TouchableOpacity
          style={styles.locationButton}
          onPress={stopLocationTracking}
        >
          <MaterialIcons name="my-location" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Sheet />

        <Marker
          coordinate={{ latitude: 24.8607, longitude: 67.0011 }}
          title="Pickup Location"
        />

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
                // console.log(
                //   "data des",
                //   data.description,
                //   details.geometry.location
                // );
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
                // console.log(
                //   "data des",
                //   data.description,
                //   details.geometry.location
                // );
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
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlayd}>
          <View style={styles.modalContainerd}>
            <View style={styles.driverCard}>
              <View style={styles.info}>
                <Text style={styles.location}>From : {pickupAreaName}</Text>
                <Text style={styles.location}>To : {dropAreaName} </Text>

                <TouchableOpacity onPress={onClose}>
                  <View style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel My Ride</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              {loading ? (
                <>
                  <LottieView
                    source={require("../../assets/images/loading.json")}
                    autoPlay
                    loop
                    style={styles.loader}
                  />
                </>
              ) : (
                <>
                {driverData.map((data: any, index: number) => (
                  <View key={index}>
                    <Text style={styles.detail}>Name: {data.name}</Text>
                    <Text style={styles.detail}>
                      PickUp: {data.pickupLocation}
                    </Text>
                    <Text style={styles.detail}>Drop: {data.dropLocation}</Text>
                    <View style={globalStyle.buttonRow}>
                      <TouchableOpacity
                        style={globalStyle.buttonAccept}
                        onPress={() => acceptUserRequest(data.userID)}
                      >
                        <Text style={globalStyle.buttonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={globalStyle.buttonReject}
                        onPress={() => rejectUserRequest(data.userID)}
                      >
                        <Text style={globalStyle.buttonTextd}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default DriverDashboard;

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
    padding: 15,
    elevation: 5,
  },
  closeButtond: {
    alignSelf: "flex-end",
    padding: 5,
  },
  driverCard: {
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "green",
  },
  info: {
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 100,
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
  loader: {
    width: 400,
    height: 500,
    alignSelf: "center",
  },
  locationButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
