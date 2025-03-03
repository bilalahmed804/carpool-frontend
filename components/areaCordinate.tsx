import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function AreaCordinate() {

    const userData = [
        { value: "Rect Native", label: "rn" }, 
        { value: "Swift", label: "sw  " },
        { value: "Rect Native", label: "rn" }, 
        { value: "Swift", label: "sw  " },
        { value: "Rect Native", label: "rn" }, 
        { value: "Swift", label: "sw  " },
        { value: "Rect Native", label: "rn" }, 
        { value: "Swift", label: "sw  " },
        { value: "Rect Native", label: "rn" }, 
        { value: "Swift", label: "sw  " }
    ]

    const [dataAll, setData] = useState(false)

    // const fetchCordinate =async ()=>{

    //     try{
    //         const res = await axios.get(AppRoutes.areaCordinate)
    //         console.log(res.data);

    //     }catch(error){
    //         console.log(error);

    //     }
    // }

    const toggleExpanded = useCallback(()=> setData(!dataAll),[dataAll]
)

    return (
        <View>
            <TouchableOpacity style={styles.button} 
            activeOpacity={0.8}
            onPress={toggleExpanded}>
                <Text style={styles.text}>Select Area</Text>
                <AntDesign name={dataAll ? "caretup" : "caretdown"} />
            </TouchableOpacity>
            {
                dataAll ? (
                <View style={styles.option}>

                <FlatList 
                keyExtractor={(item,index)=> item.label + index}
                data={userData} renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.8} style={styles.optionItem}>
                    <Text>
                        {item.value}</Text>
                </TouchableOpacity>
                )} 
                ItemSeparatorComponent={()=> <View style={styles.separator}/>
            }
                />
            </View>
            ) : null}
        </View>
    )
}

export default AreaCordinate

const styles = StyleSheet.create({
    optionItem:{
        height:40,
        justifyContent : "center",
    },
    separator:{
        height: 4
    },
    option:{
        position: "absolute",
        top : 53,
        backgroundColor : "white",
        width :"100%",
        padding :10,
        borderRadius : 6,
        maxHeight:250,
        elevation: 5, 
        shadowColor: "#000", 
    },
    text: {
        fontSize: 15,
        opacity: 0.8,
    },
    button: {
        height: 50,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 8,
    }
})