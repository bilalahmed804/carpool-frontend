
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
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        width: 320,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
      },
      message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
      button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
      },
      acceptButton: {
        backgroundColor: "#4CAF50",
      },
      rejectButton: {
        backgroundColor: "lightcoral",
      },
      closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
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
      //drivr styling
      containerd: {
        flex: 1,
      },
      navbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        padding: 2,
        color: "blue",
      },
      rideContainer: {
        position: "absolute",
        borderColor: "#5F9EE0",
        borderWidth: 2,
        bottom: 2,
        left: 2,
        right: 2,
        backgroundColor: "white",
        padding: 8,
        borderRadius: 20,
      },
      overlayd: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      },
      modalContainerd: {
        backgroundColor: "#fff",
        paddingLeft: 15,
        paddingRight: 15,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        gap: 2,
        minHeight: "95%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      },
      closeButtond: {
        alignSelf: "flex-end",
        padding: 5,
      },
      buttond: {
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
      },
      buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 15,
      },
      buttonAccept: {
        backgroundColor: "#28a745",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        marginRight: 10,
      },
      buttonReject: {
        backgroundColor: "#dc3545",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
      },
      buttonTextd: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
      },
      inputCard: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 10,
      },
      fareContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      inputField: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#CCC",
      },
    
      named: {
        fontSize: 18,
        fontWeight: "500",
      },
      driverCard: {
        flexDirection: "row",
        // borderEndEndRadius: 30,
        // borderTopLeftRadius: 30,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginBottom: 20,
        backgroundColor: "",
        width: "100%",
        elevation: 5,
        borderColor: "gray",
      },
      userCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 5,
        width: "100%",
      },
      userImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 15,
        borderWidth: 2,
        borderColor: "#007BFF",
      },
      userInfo: { flex: 1 },
      detail: { fontSize: 17, fontWeight: "500", color: "#666" },
      info: {
        flex: 1,
      },
      spinner: {
        marginVertical: 10,
      },
      messaged: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
      },
      fare: {
        fontSize: 16,
        justifyContent: "space-between",
        fontWeight: "500",
        marginRight: 20,
        color: "#555",
      },
      
})

export default globalStyle;
const devURL = "http://192.168.5.230:4000";
// const prodURL = "https://carpool-backend-staging.up.railway.app";


export const BASE_URL = devURL;
export const AppRoutes = {
  signupUser: BASE_URL + "/user/signupUser",
  signupRider: BASE_URL+"/user/signupRider",
  login: BASE_URL + "/user/login",
  getAllUser: BASE_URL + "/user/allUsers",
  getCurrentUser: BASE_URL + "/user/currentUser",
  UserJourney : BASE_URL + "/rides/user",
  DriverJourney : BASE_URL + '/rides/rider',
  areaCordinate : BASE_URL + "/location/getLocations"
};

