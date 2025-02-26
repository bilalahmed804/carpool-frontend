import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

function Index(){
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key:any, value:any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/carpool.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome To Carpool</Text>
        <Text style={styles.description}>
        Join our community to share rides, save costs, and make your journey
        more enjoyable!
        </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="user@gmail.com"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="......"
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry={true}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
      <Text  >New Here? <Text style={styles.link} onPress={() => router.push("/pages/signup")}>Create A New Account</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor:"white",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
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
    fontWeight:"bold",
    color:"blue",
  },
  
});

export default Index