import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={()=> router.push("./pages/signup")}><Text style={{ backgroundColor: "#C4DEF6",
        color: "white" ,padding : 10, }}>Click</Text></TouchableOpacity>
    </View>
  );
}

export default Index
