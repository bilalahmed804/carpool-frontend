import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type BottomSheetModalProps = {
  isVisible: boolean;
  message: string;
  name: string;
  fare: string;
  Vehicle: string;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
};

const BottomSheetModal = ({ isVisible, message,name,fare,Vehicle, onAccept,onReject ,onClose }: BottomSheetModalProps) => {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.card}>
            <Image
              source={{ uri: "http://res.cloudinary.com/dl4kqxuyk/image/upload/v1740661676/Ride_Sharing/Drivers/nyabkfscagusux11fxl8.jpg" }}
              style={styles.driverImage}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.fare}>{fare}</Text>
              <Text style={styles.vehicle}>{Vehicle}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "50%",
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
  message: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
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
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
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

export default BottomSheetModal;
