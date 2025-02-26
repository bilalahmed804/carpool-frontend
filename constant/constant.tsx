
import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
    heading: {
        color: "#00008B",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "sans-serif",
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
    }

})

export default globalStyle;




const devURL = "http://192.168.2.131:4000";
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