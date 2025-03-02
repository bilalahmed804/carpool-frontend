import { AuthContext } from "@/context/authContext";
import { globalContext } from "@/context/globalContext";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
<<<<<<< Updated upstream
import BlueButton from "./blueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

function Sheet() {
  const { setOpen, Open } = useContext(globalContext)
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter()

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

=======

function Sheet() {
  const { setOpen, Open } = useContext(globalContext)
  const { user } = useContext(AuthContext)
  console.log(user)
>>>>>>> Stashed changes
  const closeSheet = () => {
    setOpen(!Open);
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButton}>
        <TouchableOpacity>
<<<<<<< Updated upstream
          <Text style={styles.closeButtonText} onPress={closeSheet} >X</Text>
=======
          <Text onPress={closeSheet} >X</Text>
>>>>>>> Stashed changes
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={{uri:"http://res.cloudinary.com/dl4kqxuyk/image/upload/v1740119423/Ride_Sharing/Drivers/iltctosvnecmglgceznv.jpg"}} alt="CP" style={styles.avatar}/>
      </View>
        <Text style={styles.title}>Name</Text>
<<<<<<< Updated upstream
        <Text style={styles.email}>Name</Text>
      <BlueButton onPress={handleLogout} text="logout" />
=======
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    width: "55%",
    height: '100%',
    backgroundColor: "white",
<<<<<<< Updated upstream
=======
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
>>>>>>> Stashed changes
    elevation: 5,
    padding: 10,
  },
  header: {
<<<<<<< Updated upstream
    justifyContent: "center",
=======
    flexDirection: "row",
    justifyContent: "space-between",
>>>>>>> Stashed changes
    alignItems: "center",
    marginBottom: 10,
  },
  avatar:{
<<<<<<< Updated upstream
    width: 44,
    height: 44,
=======
    width: 36,
    height: 36,
>>>>>>> Stashed changes
    borderRadius: 100
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
<<<<<<< Updated upstream
    textAlign: "center"
  },
  email:{
    fontSize: 12,
    fontWeight:"light",
    textAlign: "center"
=======
>>>>>>> Stashed changes
  },
  closeButton: {
    alignItems :"flex-end",
  },
<<<<<<< Updated upstream
  closeButtonText:{
    fontSize: 22
  }
=======
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 14,
    color: "black",
  },
>>>>>>> Stashed changes
});

export default Sheet;
