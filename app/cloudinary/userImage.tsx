import { useContext, useState } from "react";
import PickerImage from "../../components/pickerImage";
import * as ImagePicker from "expo-image-picker";
import { Image, View } from "react-native";
import globalStyle from "@/constant/constant";
import { globalContext } from "@/context/globalContext";

function UserImage (){
    const {userprofileImage , setUserProfileImage}= useContext(globalContext)

    console.log("user image",userprofileImage);
    

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
              data.append("folder", "Ride_Sharing/Users");
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
                    const jsonFile = await res.json()
                    setUserProfileImage(jsonFile.url)
                    return jsonFile.url
                }catch(error){
                    console.error("upload", error);
                    return null
                }
            }
    
    return(
        <View>

        <PickerImage onPress={pickProfileImage} text="Profile Image"/>
        {userprofileImage  && <Image source={{ uri: userprofileImage  }} style={globalStyle.image} />}
        </View>
    )
}

export default UserImage