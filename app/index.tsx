import {useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import GreenButton from "../components/greenButton";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import globalStyle, { AppRoutes } from "@/constant/constant";
import axios from "axios"
import { AuthContext } from "@/context/authContext";
import RoleBasedNavigation from "@/components/roleBasedNavigation";
import { Ionicons } from "@expo/vector-icons";

function Index() {
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter()
  const [formData, setFormData] = useState({email: "",password: "",});
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {}
    setError(newErrors)
    if(!formData.email) newErrors.email = "Email is required";
    if(!formData.password) newErrors.password = "password is required";

    const obj = {
      email : formData.email,
      password : formData.password
    }
    try {
      const response = await axios.post(AppRoutes.login, obj)
      const data = response?.data?.data
      AsyncStorage.setItem("token", data?.token)
      setUser(data?.user)
      if(data?.user?.role === "driver"){
        return router.push("/pages/driverdashboard")
      }  
      else if(data?.user?.role === "user"){
        return router.push("/pages/userdashboard")
      } else{
        return router.push("/")
      }
    } catch (error:any) {
      console.log("error==>", error.message);
    }
  };

  return (
    <>
    {user ? <RoleBasedNavigation/> : 
    <ScrollView style={globalStyle.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/carpool.png")}
      />
      
      <Text style={styles.title}>Welcome To Carpool</Text>
      <Text style={styles.description}>
        Join our community to share rides, save costs, and make your journey
        more enjoyable!
      </Text>
      <View style={globalStyle.inputContainer}>
        <Text style={globalStyle.labeld}>Email</Text>
        <View style={globalStyle.passwordWrapper}>
        <TextInput
          style={globalStyle.inputuser}
          placeholder="example@gmail.com"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          />
          </View>
        {error.email && <Text style={globalStyle.errorThrow}>{error.email}</Text>}
        </View>
        <View style={globalStyle.inputContainer}>
        <Text style={globalStyle.labeld}>Password</Text>
        <View style={globalStyle.passwordWrapper}>
        <TextInput
          style={globalStyle.inputuser}
          placeholder="* * * * * * *"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry={!isPasswordVisible} 
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={globalStyle.eyeIcon}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="#777"
          />
        </TouchableOpacity>
      </View>
            {error.password && <Text style={globalStyle.errorThrow}>{error.password}</Text>}
        </View>
      <GreenButton onPress={handleSubmit} text="submit" />
      <Text style={styles.link}>
        New Here?{" "}
        <Text style={styles.link1} onPress={() => router.push("/pages/signup")}>
          Create A New Account
        </Text>
      </Text>
    </ScrollView>
      }  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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
    color: "#4CAF50",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#4CAF50",
  },
  btn: {
    marginVertical: 4,
  },
  link: {
    fontSize: 16,
    marginHorizontal: "auto",
    marginVertical: 18,
    fontWeight: "900",
  },

  link1: {
        color: "#4CAF50",
  },
});

export default Index;
