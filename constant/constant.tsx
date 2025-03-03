
import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
    heading: {
        color: "#00008B",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "sans-serif",
    },
    pageHeading:{
        fontSize: 28,
        fontWeight: "800",
        color: "#5F9EE0",
        fontFamily: "sans-serif",
    },
    container: {
        padding: 20,
        backgroundColor :"white"
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subHeading: {
        color: "#008000",
        fontSize: 16,
        fontWeight: "semibold",
        fontFamily: "sans-serif",
    },

    greenButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius:10,
        width: 100,
        textAlign: "center",

    },
    backgroundColor:{
        backgroundColor: "white"
    },
    textAlign:{
        flex:1 , alignItems : "center"
    },
    greenText:{
        color : "#4CAF50",
    },
    blueText:{
        color :"#5F9EE0",
    },
    hovergreenButton: {
        backgroundColor: "#37D67A",
        elevation: 5,
    },
    blueButton: {
        backgroundColor: "#5F9EE0",
        color: "white",
        borderRadius:10,
        width: 100,
        textAlign: "center",
    },
    hoverblueButton: {
        backgroundColor: "#0693E9",
        elevation: 5,
    },

    textSize: {
        fontSize: 14
    },
    bg: {
        backgroundColor: "white"
    },
    picker: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
      },
      image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 8,
      },
      imagePickerText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
      imagePickerButton: {
        backgroundColor:"gray",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 8,
      },

})

export default globalStyle;





const devURL = "http://192.168.7.80:4000";
const prodURL = "https://carpool-backend-staging.up.railway.app";

export const BASE_URL = devURL;
export const AppRoutes = {
  signupUser: BASE_URL + "/user/signupUser",
  signupRider: BASE_URL+"/user/signupRider",
  login: BASE_URL + "/user/login",
  getAllUser: BASE_URL + "/user/allUsers",
  getCurrentUser: BASE_URL + "/user/currentUser",
  SendRideData : BASE_URL + '/rides/user',
  SendRideShare : BASE_URL + '/rides/rider',
};