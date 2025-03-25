import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Modal, Image, TouchableOpacity, Text, FlatList, } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import GreenButton from "@/components/greenButton";
import Sheet from "@/components/sheet";
import { AppRoutes, BASE_URL } from "@/constant/constant";
import AutoComplete from "@/components/autoComplete";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import { io } from "socket.io-client";
import BlueButton from "@/components/blueButton";
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";

const socket = io(BASE_URL);
// const socket = io("http://192.168.2.131:4000");

function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [initialLocation, setInitialLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [isRideAccepted, setIsRideAccepted] = useState(false);
  const [driverID, setDriverID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState([]);
  const [journeyExpense, setJourneyExpense] = useState([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isSocketConnected, setisSocketConnected] = useState(socket.connected);
  const mapRef = useRef<MapView>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const [driverLiveLocation, setDriverLiveLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [centerPoint, setCenterPoint] = useState<{ latitude: number; longitude: number; }[] | null>(null);
  const ApiKey = process.env.EXPO_PUBLIC_API_KEY
  // const [driverLiveLocation, setDriverLiveLocation] = useState();


  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      // console.log("Socket connected");
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
    // console.log("user registered with socket");
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
      driver_ID: driverID,
      userID: user._id
    };
    socket.emit("userRequestToDriver", userData)
  };

  //Socket : Step 3
  useEffect(() => {
    socket.on("requestAccepted", (driverdata: any) => {
      console.log("requestAccepted", driverdata);
      setDriverID(driverdata.driver_ID);
      setIsRideAccepted(true);
      setModalVisible(false);
      setModalOpen(false)
      sendMyLocation()
    })
    socket.on("requestRejected", (driverdata: any) => {
      console.log("requestRejected", driverdata)
      setModalVisible(false)
    })
  }, [socket.on])

  // Socket : Step 4
  useEffect(() => {
    if (isRideAccepted) {  // Emit location only when the ride is accepted
      const obj = {
        liveLocation: location,
        driverID: driverID
      }
      socket.emit("userLiveLocation", obj);
    }
  }, [location]);

  // Socket : Step 5 (reciving driver live location)
  useEffect(() => {
    socket.on("driverLocation", (data: any) => {
      setDriverLiveLocation({
        latitude: data.liveLocation.coords.latitude,
        longitude: data.liveLocation.coords.longitude,
      });
      console.log("(110) Driver Live Location set in stat :", driverLiveLocation);

    });
  }, [location]);

  // console.log("Driver Live Location on user dashboard (outside):", driverLiveLocation);


  // sending user live location to backend(for driver)
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
        timeInterval:2000,
      },
      (newLocation) => {

        // Ensure newLocation is valid
        if (newLocation?.coords?.latitude && newLocation?.coords?.longitude) {
          setLocation(newLocation);  // Update only when valid location is received
          console.log("User Live Location:",newLocation);

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
  }

  const handleSearchRides = async () => {
    if (!user || !user._id) {
      return;
    }
    const areaList = {
      userID: user._id,
      from: { latitude: initialLocation?.latitude, longitude: initialLocation?.longitude, },
      to: { latitude: destination?.latitude, longitude: destination?.longitude, },
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
  const handleDirectionsBetween =(result : any)=>{
    const totalPoint = 20
    const coordinates = result.coordinates
    if(result.coordinates.length >= totalPoint){
      const betweenSpace = Math.floor(result.coordinates.length / totalPoint)

    const betweenPoint = Array.from({length:totalPoint}, (_,i)=>
    coordinates[betweenSpace * (i + 1)]).filter(point => point)
      setCenterPoint(betweenPoint)
      // console.log("20 betweenPoint Coordinates:", betweenPoint);
    }
  }

  const collectDriverDetails = async (userID: any) => {
    setDriverID(userID)
    try {
      const response = await axios.post(AppRoutes.getDynamicDriver, { id: userID });
      console.log("driverDetail", response.data.data);
      setSelectedDriver(response.data.data);
      setModalVisible(true);
    } catch (error: any) {
      console.log("error in collecting driver details==>", error.message);
    }
  }

  const closeModal = () => {
    setModalOpen(!modalOpen);
  };

  // const goToCurrentLocation = async () => {
  //   try {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     console.log("status", status);

  //     if (status !== "granted") {
  //       alert("Location permission denied!");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.High, // High accuracy ke liye
  //     });

  //     console.log("Current Location:", location);

  //     if (mapRef.current) {
  //       mapRef.current.animateToRegion({
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.05,
  //         longitudeDelta: 0.05,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error getting location:", error);
  //   }
  // };

  const stopLocationTracking = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove(); // Tracking stop 
      locationSubscription.current = null;   // Reference clear 
      console.log("Location tracking stopped.");
    }
  };
console.log("userDashboard usercurrentlocation (244)",location);
console.log("user Dashboard driver live location (245)",driverLiveLocation);

  return (
    <>
      <View style={styles.containeruser}>
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
       <Marker coordinate={{ latitude: 24.8607, longitude: 67.0011 }} title="Pickup Location" />
      {location && (<Marker
                  coordinate={{
                    latitude: location?.coords?.latitude,
                    longitude: location?.coords?.longitude,
                  }}
                  title="your Current Location"
                  description="This is your Current location"
                  pinColor="blue"
                />)}
        {driverLiveLocation &&(
          <Marker
          coordinate={driverLiveLocation}
          title="Location"
          description="Driver Current Location"
          pinColor="red"
          />
        )}
          
       {location && driverLiveLocation && (
                      <MapViewDirections
                          origin={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}
                          destination={driverLiveLocation}
                          apikey={ApiKey || ""}
                          strokeWidth={4}
                          strokeColor="blue"
                          onReady={handleDirectionsBetween}
                      />
                  )}
        
        </MapView>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={stopLocationTracking}
        >
          <MaterialIcons name="my-location" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Sheet />


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
                    source={{ uri: data.profileImage }}
                    alt="CP"
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>{data.name}</Text>
                  <View style={styles.divider}></View>
                  <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>{data.gender}</Text>
                    <Text>|</Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>{data.vehicleCategory}</Text>
                  </View>
                  <View style={styles.divider}></View>
                  <Text > <Ionicons style={{ fontSize: 20, textAlign: "center" }} name="help-buoy-outline">  Vehicle No :  {data.vehicleNo}</Ionicons></Text>
                  <View style={styles.divider}></View>
                  <Text > <Ionicons style={{ fontSize: 20, textAlign: "center" }} name="document-outline">  License No : {data.licenseNo}</Ionicons></Text>
                  <View style={styles.divider}></View>

                  <View style={styles.btn}>
                    <Ionicons name="call-outline" size={34} onPress={closeModal} />
                    <Ionicons name="logo-whatsapp" color="green" size={34} onPress={closeModal} />

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
            <FlatList data={journeyExpense} renderItem={({ item, index }: { item: any, index: number }) => {
              return (
                <View key={index} style={styles.carduser}>
                  <View style={styles.infouser}>
                    <Text style={styles.nameuser}>
                      Available Seats : {item.availableSeats}
                    </Text>
                    <Text style={styles.fareuser}>
                      Fare Per Seat : {item.farePerSeat}
                    </Text>
                  </View>
                  <GreenButton text="Details" onPress={() => collectDriverDetails(item.userID)} />
                </View>
              )
            }} />
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
    position: "absolute",
    flex: 1,
    height: "100%",
    width: "100%",
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"

  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 6,
    gap: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButtonuser: {
    alignSelf: "flex-end",
    paddingRight: 10,
  },
  carduser: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    margin: 6,
    width: "95%",
    borderColor: "green",
    borderWidth: 2,
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
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#4CAF50",

  },
  fareuser: {
    fontSize: 16,
    fontWeight: "bold",
  },
  vehicleuser: {
    fontSize: 14,
    color: "#777",
  },
  popupContainer: {
    flex: 1,
    width: "90%",
    height: "60%",
    position: "absolute",
    borderRadius: 20,
    marginVertical: "auto",
    marginHorizontal: "auto",
    backgroundColor: "white",
    elevation: 6,
    zIndex: 1000,
    padding: 10,
    borderColor: "green",
    borderWidth: 2,
  },
  infoContainer: {
    gap: 12,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    margin: 20,

  },
  btn: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
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
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  divider: {
    height: 2,
    backgroundColor: "darkgrey",
    width: "100%",
  },
});
