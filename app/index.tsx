import Input from '@/components/Input';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import GreenButton from '../components/greenButton';


export interface form_Data {
  email: string,
  password: string
}

function Index() {
  const { control, handleSubmit } = useForm<form_Data>()
  const Submit = (formData: form_Data) => {
    console.log('Form Data:', formData);
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"

      >
        <View style={styles.container}>
          <Image source={require('../assets/images/carpool.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome To Carpool</Text>
          <Text style={styles.description}>
            Join our community to share rides, save costs, and make your journey
            more enjoyable!
          </Text>
          <View style={styles.inputContainer}>
            <Input
              control={control}
              placeholder="email"
              name='email'
              label='Email'
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              control={control}
              placeholder='password'
              name='password'
              label='Password'
              secureTextEntry={true}
            />
          </View>
           <GreenButton onPress={handleSubmit(Submit)} text='submit'/>
          <Text  >New Here? <Text style={styles.link} onPress={() => router.push("/pages/signup")}>Create A New Account</Text></Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  logo: {
    width: 220,
    height: 220,
    marginHorizontal: "auto",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  btn:{
    marginVertical: 4
  },
  link:{
    fontSize: 16,
    marginHorizontal: "auto",
    marginVertical: 12,
    fontWeight:"900",
  },
  link1:{
    color : "#5F9EE0",
  }
});

export default Index