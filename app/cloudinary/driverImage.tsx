import { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, Text, TouchableOpacity, View } from "react-native";
import globalStyle from "@/constant/constant";
import PickerImage from "../../components/pickerImage";
import { globalContext } from "@/context/globalContext";

function DriverImage() {
  const {profileImage, vehicleImage, setProfileImage, setVehicleImage}= useContext(globalContext)

  

const pickProfileImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });
  if (!result.canceled && result.assets.length > 0) {
    const uploadUrl = await uploadImageToCloudinary(result.assets[0]);
  }
};
const uploadImageToCloudinary = async (image: any) => {
  const cloud = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME;
  if (!image.uri) return null;
  const data = new FormData();
  data.append("file", {
    uri: image.uri,
    name: `profile_${Date.now()}.jpg`,
    type: "image/jpeg",
  } as any);
  data.append("upload_preset", "Ride_Sharing");
  data.append("folder", "Ride_Sharing/Drivers");
  if (cloud) {
    data.append("cloud_name", cloud);
  } else {
    console.error("Cloudinary cloud name is not defined");
    return null;
  }
  try{

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
    const jsonFile = await res.json();
    setProfileImage(jsonFile.url)
    return jsonFile.url
  }catch(error){
    console.error("upload", error);
    return null
   
  }
}
const pickVehicleImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  if (!result.canceled && result.assets.length > 0) {
    const uploadUrl = await uploadImageToCloudinaryV(result.assets[0]);
  }
};


const uploadImageToCloudinaryV = async (image: any) => {
  const cloud = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME;
  if (!image.uri) return null;
  const data = new FormData();
  data.append("file", {
    uri: image.uri,
    name: `profile_${Date.now()}.jpg`,
    type: "image/jpeg",
  } as any);
  data.append("upload_preset", "Ride_Sharing");
  data.append("folder", "Ride_Sharing/Vehicles");
  if (cloud) {
    data.append("cloud_name", cloud);
  } else {
    console.error("Cloudinary cloud name is not defined");
    return null;
  }
  try{

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
    const jsonFile = await res.json();
    setVehicleImage(jsonFile.url)
    return jsonFile.url
  }catch(error){
    console.error("upload", error);
    return null
   
  }
};

  return (
    <View>
      <PickerImage onPress={pickProfileImage} text="Profile Image"/>
      {profileImage && <Image source={{ uri: profileImage || "" }} style={globalStyle.image} />}
      <PickerImage onPress={pickVehicleImage} text="Pick Vehicle Image"/>
      {vehicleImage  && <Image source={{ uri: vehicleImage || ""  }} style={globalStyle.image} />}
    </View>
  )
};
export default DriverImage;


