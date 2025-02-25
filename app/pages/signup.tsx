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
        <Button title="Register As Driver" onPress={() => router.push("/pages/driverRegister")}/>
      </View>
      <View style={styles.btn2}>
        <Button color="black" title="Register As User" onPress={() => router.push("/pages/userRegister")} />
      </View>
      <Text>
        Already Have an Account?{" "}
        <Text style={styles.link} onPress={() => router.push("/")}>
          Login
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
  link: {
    fontWeight: "bold",
    color: "blue",
  },
  btn: {
    marginVertical: 10,
  },
  btn2: {
    marginVertical: 10,
  },
});

export default SignUp;
