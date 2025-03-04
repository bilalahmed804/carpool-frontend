import { AuthContext } from "@/context/authContext";
import { globalContext } from "@/context/globalContext";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BlueButton from "./blueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Sheet() {
  const { setOpen, Open } = useContext(globalContext)
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter()
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }
  const closeSheet = () => {
    setOpen(!Open);
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButton}>
        <TouchableOpacity>
          <Text style={styles.closeButtonText} onPress={closeSheet} >X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={user?.profileImage} alt="CP" style={styles.avatar}/>
      </View>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.btn}>
      <BlueButton onPress={handleLogout} text="logout" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
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
  avatar:{
    width: 44,
    height: 44,
    borderRadius: 100
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  email:{
    fontSize: 12,
    fontWeight:"light",
    textAlign: "center"
  },
  closeButton: {
    alignItems :"flex-end",
  },
  closeButtonText:{
    fontSize: 26,
  },btn:{
    flex :1,
    justifyContent:"center",
    alignItems:"center"
  }
});
