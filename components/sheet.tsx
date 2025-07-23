import { AuthContext } from "@/context/authContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import { BASE_URL } from "@/constant/constant";
import GreenButton from "./greenButton";

const socket = io(BASE_URL);
export default function Sheet() {
  const [Open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  // console.log("current user detail--->",user);

  const [isSocketConnected, setisSocketConnected] = useState(socket.connected);
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-250)).current;

  useEffect(() => {
    socket.on("disconnect", () => setisSocketConnected(false));
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (Open) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [Open]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    socket.disconnect();
    setUser(null);
    router.push("/");
  };

  // Function to open/close modal
  const openSheet = () => setOpen(true);
  const closeSheet = () => setOpen(false);

  return (
    <>
      <TouchableOpacity onPress={openSheet} style={styles.iconContaineruser}>
        <Ionicons name="menu" size={50} color="green" />
      </TouchableOpacity>

      {Open && (
        <Animated.View
          style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Image
              source={{
                uri: user?.profileImage || "./assets/default-avatar.png",
              }}
              style={styles.avatar}
            />

            <Text style={styles.title}>{user?.name || "Guest User"}</Text>
            <View style={styles.divider}></View>
            <Text style={styles.userInfoMenuText}>
              {user?.email || "No email available"}
            </Text>
            <View style={styles.divider}></View>
            <Text style={styles.userInfoMenuText}>
              Phone: {user?.phoneNumber}
            </Text>
            <View style={styles.divider}></View>
            <Text style={styles.userInfoMenuText}>CNIC: {user?.nicNo}</Text>
            <View style={styles.divider}></View>
            {
              user?.licenseNo && <Text style={styles.userInfoMenuText}>
              License: {user.licenseNo}
              <View style={styles.divider}></View>
              </Text>
            
            }
            {/* <Text style={styles.userInfoMenuText}> */}
              {/* License: {user.licenseNo} */}
            {/* </Text> */}

            <Text style={styles.userInfoMenuText}>
              Registerd at : {user?.createdAt.slice(0, 10)}
            </Text>
            <View style={styles.divider}></View>
          </View>
          <TouchableOpacity style={styles.btn}>
            <GreenButton text="Logout" onPress={handleLogout} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    padding: 20,
    width: "65%",
    height: "100%",
    backgroundColor: "#fff",
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  iconContaineruser: {
    width: 70,
    height: 70,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    padding: 10,
    position: "absolute",
  },
  header: {
    marginTop: 90,
    alignItems: "center",
  },
  avatar: {
    width: 170,
    height: 170,

    borderRadius: 90,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  userInfoMenuText: {
    fontSize: 18,
    textAlign: "center",
    color: "darkgrey",
    marginTop: 4,
  },
  button: {
    borderRadius: 5,
    alignItems: "center",
  },
  btn: {
    position: "absolute",
    bottom: 30,
    left: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "darkgrey",
    marginVertical: 10,
    width: "100%",
  },
});
