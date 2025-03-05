import React, { useContext, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DriverImage from '../cloudinary/driverImage';
import globalStyle, { AppRoutes } from '@/constant/constant';
import GreenButton from '@/components/greenButton';
import { router } from 'expo-router';
import axios from "axios"
import { globalContext } from '@/context/globalContext';

function DriverRegister(){
  const {profileImage ,vehicleImage} = useContext(globalContext)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    cnic: "",
    password: "",
    address: "",
    gender: "",
    vehicleCategory: "",
    vehicleNumber: "",
    vehicleImage: null,
    profileImage: null,
    licenseNumber: "",
  });
 const [error , setError] = useState<{ [key: string]: string }>({})
 
  const handleChange = (key:any, value:any) => {
    setFormData({ ...formData, [key]: value });
    
    
  }
  const handleSubmit =async () => {
      const newErrors: { [key: string]: string } = {}
    setError(newErrors)
    if(!formData.name) newErrors.name = "Name is required"; 
    if(!formData.address) newErrors.address = "Enter Valid Address"
    if(!formData.cnic) newErrors.cnic = "Enter Valid CNIC";
    if(!formData.contact) newErrors.contact = "Enter Valid Contact No.";
    if(!formData.email) newErrors.email = "Email is required";
    if(!formData.gender) newErrors.gender = "Select Your Gender";
    if(!formData.licenseNumber) newErrors.licenseNumber = "LicenseNumber is required";
    if(!formData.password) newErrors.password = "Password is required";
    if(!formData.profileImage) newErrors.profileImage = "profileImage is required";
    if(!formData.vehicleImage) newErrors.vehicleImage = "vehicleImage is required";
    if(!formData.vehicleNumber) newErrors.vehicleNumber = "vehicleNumber is required";
    if(!formData.vehicleCategory) newErrors.vehicleType = "vehicleType is required";
    
    // console.log('Form Data:', formData);
    const obj = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      gender: formData.gender,
      phoneNumber: formData.contact,
      address: formData.address,
      profileImage: profileImage,
      nicNo: formData.cnic,
      vehicleCategory: formData.vehicleCategory,
      vehicleNo: formData.vehicleNumber,
      licenseNo: formData.licenseNumber,
      vehicleImage: vehicleImage,
      role: "driver",
    };
    console.log("obj", obj);
    
    try {
      const res = await axios.post(AppRoutes.signupRider, obj);
      if (res && res.data) {
        const data = res.data?.data
        router.push("/pages/driverdashboard")
        console.log(data)
        console.log("finlly");
        
      }
    } catch (error) {
      console.error("error when submiting the data", error);
    }
  };
  return (
    <ScrollView style={globalStyle.backgroundColor}
  >
     <View style={globalStyle.textAlign}>
          <Text
            style={[globalStyle.pageHeading , globalStyle.greenText]}>
            Sign Up
          </Text>
          </View>
    <View style={globalStyle.container}>
  <View style={globalStyle.inputContainer}>
    
    <Text style={globalStyle.label}>Name</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="Enter your Name"
      value={formData.name}
      onChangeText={(text) => handleChange('name', text)}
    />
    {error.name && <Text>{error.name}</Text>}
  </View>

  <View style={globalStyle.inputContainer}>
    <Text style={globalStyle.label}>Email</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="example@gmail.com"
      value={formData.email}
      onChangeText={(text) => handleChange('email', text)}
      keyboardType="email-address"
      autoCapitalize="none"
      />
      {error.email && <Text>{error.email}</Text>}
  </View>

  <View style={globalStyle.inputContainer}>
    <Text style={globalStyle.label}>Password</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="Enter your Password"
      value={formData.password}
      onChangeText={(text) => handleChange('password', text)}
      secureTextEntry
      />
      {error.password && <Text>{error.password}</Text>}
  </View>

  <View style={globalStyle.inputContainer}>
    <Text style={globalStyle.label}>Contact No.</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="Enter your Contact No."
      value={formData.contact}
      onChangeText={(text) => handleChange('contact', text.replace(/[^0-9]/g, ''))}
      keyboardType="numeric"
      maxLength={11}
      />
      {error.contact && <Text>{error.contact}</Text>}
  </View>

  <View style={globalStyle.inputContainer}>
    <Text style={globalStyle.label}>CNIC No.</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="Enter your CNIC No. (without dashes)"
      value={formData.cnic}
      onChangeText={(text) => handleChange('cnic', text.replace(/[^0-9]/g, ''))}
      keyboardType="numeric"
      maxLength={13}
      />
      {error.cnic && <Text>{error.cnic}</Text>}
  </View>

  

  <View style={globalStyle.inputContainer}>
    <Text style={globalStyle.label}>Address</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="Enter your Address"
      value={formData.address}
      onChangeText={(text) => handleChange('address', text)}
      />
      {error.address && <Text>{error.address}</Text>}
  </View>
<View>

  <View style={globalStyle.inputContainer}>
  <Text style={globalStyle.label}>Gender</Text>
  <Picker
        selectedValue={formData.gender}
        onValueChange={(gender) => handleChange('gender', gender)}
        style={globalStyle.picker}
        >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Male" value="male" />
      </Picker>
      {error.gender && <Text>{error.gender}</Text>}

  <Text style={globalStyle.label}>Vehicle Type</Text>
  <Picker
        selectedValue={formData.vehicleCategory}
        onValueChange={(vehicleCategory) => handleChange("vehicleCategory" ,vehicleCategory)}
        style={globalStyle.picker}
        >
        <Picker.Item label="Select an Vehicle Type" value="" />
        <Picker.Item label="Bike" value="Bike" />
        <Picker.Item label="Car" value="Car" />
        <Picker.Item label="Rickshaw" value="Rickshaw" />
      </Picker>
      {error.vehicleCategory && <Text>{error.vehicleCategory}</Text>}
        </View>
  </View>
    
  <DriverImage/> 

  <View style={globalStyle.inputContainer}>
    <Text style={globalStyle.label}>License Number</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="Enter your License Number"
      value={formData.licenseNumber}
      onChangeText={(text) => handleChange('licenseNumber', text)}
      autoCapitalize="characters"
      />
      {error.licenseNumber && <Text>{error.licenseNumber}</Text>}
  </View>

  <View style={globalStyle.inputContainer}>
    <Text style={globalStyle.label}>Vehicle Number</Text>
    <TextInput
      style={globalStyle.input}
      placeholder="Enter your Vehicle Number"
      value={formData.vehicleNumber}
      onChangeText={(text) => handleChange('vehicleNumber', text)}
      autoCapitalize="characters"
      />
      {error.vehicleNumber && <Text>{error.vehicleNumber}</Text>}
  </View>

  
  
       
            <GreenButton onPress={handleSubmit}  text='Submit'/>
</View>
</ScrollView>
  );
}
export default DriverRegister