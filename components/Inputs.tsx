import globalStyle from "@/constant/constant";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface typeString {
    text?: string;
    value?:string;
    placeholder?:string;
    onChangeText?:any;
  }

function Inputs({value,placeholder,onChangeText,text}:typeString){
    const [error , setError] = useState<{ [key: string]: string }>({})
    return(
        <View style={globalStyle.inputContainer}>
    
        <Text style={globalStyle.label}>{text}</Text>
        <TextInput
          style={globalStyle.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType="email-address"
      autoCapitalize="none"
      maxLength={11}
        />
        {error.name && <Text>{error.name}</Text>}
      </View>
    )
}

export default Inputs