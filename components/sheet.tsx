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

const socket = io(BASE_URL);
export default function Sheet() {
  const [Open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
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
        <Ionicons name="menu" size={30} color="#5F9EE0" />
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
            <Text style={styles.email}>
              {user?.email || "No email available"}
            </Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleLogout}>
            <View style={styles.button}>
              <Text style={styles.title}>Logout</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "65%",
    height: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  button: {
    backgroundColor: "lightgray",
    padding: 10,
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
});
