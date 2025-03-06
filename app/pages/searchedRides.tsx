import GreenButton from "@/components/greenButton";
import { BASE_URL } from "@/constant/constant";
import { AuthContext } from "@/context/authContext";
import { globalContext } from "@/context/globalContext";
import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { io } from "socket.io-client";

export default function SearchedRides() {
  const driversData = [
    {
      id: "1",
      name: "Ali Khan",
      fare: "Rs. 250",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      name: "Ahmed Raza",
      fare: "Rs. 300",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      name: "Sara Malik",
      fare: "Rs. 200",
      image: "https://via.placeholder.com/100",
    },
  ];
  const { setModalOpen, modalOpen } = useContext(globalContext);
  const { user } = useContext(AuthContext)
  console.log("searchedrides pe ==>",user);
  
  const closeModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRequest = () => {
    const socket = io(BASE_URL)
    // socket.on("data", (payload)=>{
    //   console.log(payload);
    // })
    const userData = {
      "name": user?.name,
      "phoneNumber" : user?.phoneNumber,
      "profileImage" : user?.profileImage 
    }
  
    socket.emit("userData", userData)
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
           source={{
            uri: "http://res.cloudinary.com/dl4kqxuyk/image/upload/v1740661676/Ride_Sharing/Drivers/nyabkfscagusux11fxl8.jpg",
          }}
          style={styles.driverImage}
        />
        <View style={styles.info}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.fare}>Fare</Text>
          <Text style={styles.vehicle}>Vehicle</Text>
        </View>
        <GreenButton text="See Detail" onPress={() => closeModal()} />
      </View>

      {modalOpen && (
        <View style={styles.modalContainer}>
          <View style={styles.closeButton}>
            <TouchableOpacity>
              <Text style={styles.closeButtonText} onPress={closeModal}>
                X
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Image
              source={{
                uri: "http://res.cloudinary.com/dl4kqxuyk/image/upload/v1740661676/Ride_Sharing/Drivers/nyabkfscagusux11fxl8.jpg",
              }}
              alt="CP"
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.gender}>Gender</Text>
            <Text style={styles.vehicletype}>Vehicle</Text>
            <Text style={styles.vehicleNo}>Vehicle No.</Text>
            <Text style={styles.seats}>Available Seats</Text>
            <Text style={styles.routes}>Routes</Text>
            <Text style={styles.charges}>Charges</Text>
          </View>
          <View style={styles.btn}>
            <GreenButton onPress={closeModal} text="call" />
            <GreenButton onPress={closeModal} text="whatsapp" />
            <GreenButton onPress={handleRequest} text="request ride" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f8f8" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  driverImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  info: { flex: 1, marginHorizontal: 8 },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  fare: { fontSize: 16, color: "#666" },
  vehicle: { fontSize: 14, color: "#666" },
  modalContainer: {
    position: "absolute",
    left: 10,
    borderRadius: 10,
    top: "25%",
    width: "100%",
    backgroundColor: "white",
    elevation: 5,
    padding: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  infoContainer:{
    marginVertical: 10,
    gap: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  vehicletype: {
    fontSize: 16,
    textAlign: "center",
  },
  gender: {
    fontSize: 16,
    textAlign: "center",
  },
  seats: {
    fontSize: 16,
    textAlign: "center",
  },
  vehicleNo: {
    fontSize: 16,
    textAlign: "center",
  },
  routes: {
    fontSize: 16,
    textAlign: "center",
  },
  charges: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    alignItems: "flex-end",
  },
  closeButtonText: {
    fontSize: 26,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
});
