import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import  globalStyle  from "../constant/constant";

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={globalStyle.heading}>Edit app/index.tsx to edit this screen.</Text>
      <Text style={globalStyle.subHeading}>Edit app/index.tsx to edit this screen.</Text>
    
      <TouchableOpacity onPress={()=> router.push("./pages/signup")}><Text
       style={[{ padding : 10, }, globalStyle.greenButton ]}>Click</Text></TouchableOpacity>
    </View>
  );
}

export default Index
