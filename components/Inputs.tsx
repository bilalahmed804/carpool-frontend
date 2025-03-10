import React from "react";
import { TextInput, View, Text, StyleSheet, KeyboardTypeOptions } from "react-native";

interface InputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  maxLength?: number;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  maxLength,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        autoCapitalize="none"
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
});
