import GreenButton from "@/components/greenButton";
import { Image, StyleSheet, Text, View } from "react-native";

export default function DriverResponse() {
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
      </View>
      <View style={styles.btnContainer}>
      <GreenButton text="See Detail" />
      <GreenButton text="See Detail" />
      </View>
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
  info: { flex: 1,flexDirection: "row", marginHorizontal: 8 },
  btnContainer:{flex: 1},
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  fare: { fontSize: 16, color: "#666" },
  vehicle: { fontSize: 14, color: "#666" },
});
