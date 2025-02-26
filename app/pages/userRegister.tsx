import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

function UserRegister(){
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
    return(
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
                 User Register 
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
        </View>
        </ScrollView>
    )
}


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
})

export default UserRegister;