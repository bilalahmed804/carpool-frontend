import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

function SignUp(){
    return(
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text>testing</Text>
            <TouchableOpacity onPress={()=> router.push("./login")}><Text style={{ backgroundColor: "#C4DEF6",
        color: "white" ,padding : 10, }}>SignUp pages</Text></TouchableOpacity>
        </View>
    )
}

export default SignUp