
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
        padding: 15,
        backgroundColor :"white"
    },
    inputContainer: {
        marginBottom: 15,
    },
    passwordWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#C8E6C9",
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: "#C8E6C9",
    },
    inputuser: {
      flex: 1,
      paddingVertical: 10,
      fontSize: 16,
    },
    eyeIcon: {
      padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
    errorThrow:{
        color: "red",
        fontSize: 12,
        fontWeight: "bold",
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    labeld: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#4CAF50",
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
      imagePickerText: { color: "gray", fontSize: 14, fontWeight: "900" },
      imagePickerButton: {
        backgroundColor:"lightgray",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 8,
      },
      //drivr styling
      containerd: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  navbar: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, 
  },
  rideContainer: {
    position: "absolute",
    borderColor: "#388E3C",
    borderWidth: 2,
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  overlayd: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainerd: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  closeButtond: {
    alignSelf: "flex-end",
    padding: 8,
  },
  buttond: {
    backgroundColor: "#388E3C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  buttonAccept: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  buttonReject: {
    backgroundColor: "#D32F2F",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonTextd: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputCard: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 12,
  },
  fareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    backgroundColor: "#F1F8E9",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#388E3C",
  },
  named: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
  },
  driverCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#C8E6C9",
    width: "100%",
    elevation: 5,
    borderRadius: 12,
    borderColor: "#388E3C",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    marginVertical: 6,
    width: "100%",
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  userInfo: { flex: 1 },
  detail: { fontSize: 17, fontWeight: "500", color: "#333" },
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
    fontWeight: "bold",
    marginRight: 20,
    color: "#388E3C",
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
  getDynamicDriver: BASE_URL + "/user/getDynamicDriver",
  UserJourney : BASE_URL + "/rides/user",
  DriverJourney : BASE_URL + '/rides/rider',
  areaCordinate : BASE_URL + "/location/getLocations"
};

