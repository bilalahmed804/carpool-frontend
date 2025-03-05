// import globalStyle, { AppRoutes } from "@/constant/constant";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// function AreaCordinate() {
//    const [formData, setFormData] = useState({});
//    const [areaList , setAreaList] = useState([])

//    const handleChange = (key:any, value:any) => {
//     setFormData({ ...formData, [key]: value });
    
//   }
//     const fetchCordinate =async ()=>{

//         try{
//             const res = await axios.get(AppRoutes.areaCordinate)
//             console.log(res.data);
//             setAreaList(res.data)
//         }catch(error){
//             console.log(error);

//         }
//     }

//     useEffect(()=>{

//         fetchCordinate()
//     },[])

//     return (
//         <View style={globalStyle.inputContainer}>
//         <Text style={globalStyle.label}>Select Area</Text>
//         <Picker
//               selectedValue={formData?.area}
//               onValueChange={(value) => handleChange('area', value)}
//               style={globalStyle.picker}
//               >
//               <Picker.Item label="Select Gender" value="" />
//               {areaList.map((item, index)=>(
//                 <Picker.Item key={index} label={item.name} value={item.id}/>
//              ) )}
//             </Picker>
//               </View>
//     )
// }

// export default AreaCordinate