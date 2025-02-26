import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DriverImage from '../../components/driverImage';

function DriverRegister(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    cnic: "",
    password: "",
    address: "",
    gender: "",
    vehicleType: "",
    vehicleNumber: "",
    vehicleImage: null,
    profileImage: null,
    licenseNumber: "",
  });
 const [error , setError] = useState<{ [key: string]: string }>({})
 
  const handleChange = (key:any, value:any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
      const newErrors: { [key: string]: string } = {}
    setError(newErrors)
    if(!formData.name) newErrors.name = "Name is required"; 
    if(!formData.address) newErrors.address = "address is required"
    if(!formData.cnic) newErrors.cnic = "nic is required";
    if(!formData.contact) newErrors.contact = "contact is required";
    if(!formData.email) newErrors.email = "email is required";
    if(!formData.gender) newErrors.gender = "gender is required";
    if(!formData.licenseNumber) newErrors.licenseNumber = "licenseNumber is required";
    if(!formData.password) newErrors.password = "password is required";
    if(!formData.profileImage) newErrors.profileImage = "profileImage is required";
    if(!formData.vehicleImage) newErrors.vehicleImage = "vehicleImage is required";
    if(!formData.vehicleNumber) newErrors.vehicleNumber = "vehicleNumber is required";
    if(!formData.vehicleType) newErrors.vehicleType = "vehicleType is required";
    
    console.log('Form Data:', formData);
  };
  return (
    <ScrollView style={{backgroundColor: "white"}}
  >
     <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              marginBottom: 12,
              color: "#28A745",
            }}
          >
            Sign Up
          </Text>
          </View>
    <View style={styles.container}>
  <View style={styles.inputContainer}>
    
    <Text style={styles.label}>Name</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your Driver Name"
      value={formData.name}
      onChangeText={(text) => handleChange('name', text)}
    />
    {error.name && <Text>{error.name}</Text>}
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="example@gmail.com"
      value={formData.email}
      onChangeText={(text) => handleChange('email', text)}
      keyboardType="email-address"
      autoCapitalize="none"
      />
      {error.email && <Text>{error.email}</Text>}
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Contact</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your Contact"
      value={formData.contact}
      onChangeText={(text) => handleChange('contact', text.replace(/[^0-9]/g, ''))}
      keyboardType="numeric"
      maxLength={11}
      />
      {error.contact && <Text>{error.contact}</Text>}
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>CNIC</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your CNIC (without dashes)"
      value={formData.cnic}
      onChangeText={(text) => handleChange('cnic', text.replace(/[^0-9]/g, ''))}
      keyboardType="numeric"
      maxLength={13}
      />
      {error.cnic && <Text>{error.cnic}</Text>}
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your Password"
      value={formData.password}
      onChangeText={(text) => handleChange('password', text)}
      secureTextEntry
      />
      {error.password && <Text>{error.password}</Text>}
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Address</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your Address"
      value={formData.address}
      onChangeText={(text) => handleChange('address', text)}
      />
      {error.address && <Text>{error.address}</Text>}
  </View>

  <View style={styles.inputContainer}>
  <Text style={styles.label}>Gender</Text>
  <Picker
        selectedValue={formData.gender}
        onValueChange={(gender) => handleChange('gender', gender)}
        style={styles.picker}
      >
        <Picker.Item label="Select an Gender" value="" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Male" value="Male" />
      </Picker>
      {error.gender && <Text>{error.gender}</Text>}

  <Text style={styles.label}>Vehicle Type</Text>
  <Picker
        selectedValue={formData.vehicleType}
        onValueChange={(typeValue) => handleChange("typeValue" ,typeValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select an Vehicle Type" value="" />
        <Picker.Item label="Bike" value="Bike" />
        <Picker.Item label="Car" value="Car" />
        <Picker.Item label="Rickshaw" value="Rickshaw" />
      </Picker>
      {error.gender && <Text>{error.gender}</Text>}
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Vehicle Number</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your Vehicle Number"
      value={formData.vehicleNumber}
      onChangeText={(text) => handleChange('vehicleNumber', text)}
      autoCapitalize="characters"
      />
      {error.vehicleNumber && <Text>{error.vehicleNumber}</Text>}
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>License Number</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your License Number"
      value={formData.licenseNumber}
      onChangeText={(text) => handleChange('licenseNumber', text)}
      autoCapitalize="characters"
      />
      {error.licenseNumber && <Text>{error.licenseNumber}</Text>}
  </View>
  <View style={styles.inputContainer}>
    </View>
       <DriverImage/> 

  <Button title="Submit"  onPress={handleSubmit} />
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default DriverRegister