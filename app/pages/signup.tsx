import BlueButton from "@/components/blueButton";
import GreenButton from "@/components/greenButton";
import { router } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

function SignUp() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/carpool.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome To Carpool</Text>
      <Text style={styles.description}>
        Join our community to share rides, save costs, and make your journey
        more enjoyable!
      </Text>
      <View style={styles.btn}>
      <GreenButton onPress={() => router.push("/pages/driverRegister")} text="Register as driver"/>
      </View>
      <View style={styles.btn2}>
      <BlueButton onPress={()=> router.push("/pages/userRegister")} text="Register as user"/>
      </View>
      <Text style={styles.link}>
        Already Have an Account?{" "}
        <Text style={styles.link1} onPress={() => router.push("/")}>
          Login Here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  logo: {
    width: 220,
    height: 220,
    marginHorizontal: "auto",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  link:{
    fontSize: 16,
    marginHorizontal: "auto",
    marginVertical: 12,
    fontWeight:"900",
  },
  link1:{
    color: "#5F9EE0",
  },
  btn: {
    marginVertical: 12,
  },
  btn2: {
    marginVertical: 12,
  },
});

export default SignUp;
