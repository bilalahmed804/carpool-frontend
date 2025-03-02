import BlueButton from "@/components/blueButton";
import UserImage from "@/app/cloudinary/userImage";
import globalStyle, { AppRoutes } from "@/constant/constant";
import { globalContext } from "@/context/globalContext";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export interface form_Data {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  nicNo: string;
  gender: string;
  role?: string;
}

function UserRegister() {
  const { userprofileImage } = useContext(globalContext);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    nicNo: "",
  });
  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "email is required";
    if (!formData.password) newErrors.password = "password is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.gender) newErrors.gender = "gender is required";
    if (!formData.address) newErrors.address = "address is required";
    if (!formData.nicNo) newErrors.nicNo = "nicNo is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";

    setError(newErrors);

    const obj = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      nicNo: formData.nicNo,
      profileImage: userprofileImage,
      role: "user",
    };
    // let data = { ...formData, role: "user" , profileImage : userprofileImage};
    console.log("all data", obj);

    try {
      const res = await axios.post(AppRoutes.signupUser, obj);
      console.log("res", res);

      if (res && res.data) {
        const data = res.data?.data;
        console.log(data);
        router.push("/pages/userdashboard");
        console.log("finlly");
      }
    } catch (msg) {
      console.error("error when submiting the data", msg);
    }
  };
  return (
    <ScrollView style={globalStyle.backgroundColor}>
      <View style={globalStyle.textAlign}>
        <Text style={globalStyle.pageHeading}>Sign Up</Text>
      </View>
      <View style={globalStyle.container}>
        <View style={globalStyle.inputContainer}>
          <Text style={globalStyle.label}>Name</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Enter User Name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          {error.name && <Text>{error.name}</Text>}
        </View>
        <View style={globalStyle.inputContainer}>
          <Text style={globalStyle.label}>CNIC No.</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Enter Valid CNIC No."
            value={formData.nicNo}
            onChangeText={(text) =>
              handleChange("nicNo", text.replace(/[^0-9]/g, ""))
            }
            keyboardType="numeric"
            maxLength={13}
          />
          {error.nicNo && <Text>{error.nicNo}</Text>}
        </View>
        <View style={globalStyle.inputContainer}>
          <Text style={globalStyle.label}>Email</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="example@gmail.com"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
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
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
          {error.password && <Text>{error.password}</Text>}
        </View>
        <View style={globalStyle.inputContainer}>
          <Text style={globalStyle.label}>Contact</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Enter your Contact"
            value={formData.phoneNumber}
            onChangeText={(text) =>
              handleChange("phoneNumber", text.replace(/[^0-9]/g, ""))
            }
            keyboardType="numeric"
            maxLength={11}
          />
          {error.phoneNumber && <Text>{error.phoneNumber}</Text>}
        </View>

        <View style={globalStyle.inputContainer}>
          <Text style={globalStyle.label}>Address</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Enter your Address"
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
          />
          {error.address && <Text>{error.address}</Text>}
        </View>
        <View style={globalStyle.inputContainer}>
          <Text style={globalStyle.label}>Select Gender</Text>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(gender) => handleChange("gender", gender)}
            style={globalStyle.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
          </Picker>
          {error.gender && <Text>{error.gender}</Text>}
        </View>
        <UserImage />
        <BlueButton text="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}
export default UserRegister;
