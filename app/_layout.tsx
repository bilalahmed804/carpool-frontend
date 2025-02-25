import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown : false}} initialRouteName="index">
      <Stack.Screen name="index"/>
      <Stack.Screen name="/signup"/>
      <Stack.Screen name="/userRegister"/>
      <Stack.Screen name="/driverRegister"/>
      <Stack.Screen name="/userdashboard"/>
      <Stack.Screen name="/driverdashboard"/>
    </Stack>
  );
}
