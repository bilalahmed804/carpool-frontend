
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
