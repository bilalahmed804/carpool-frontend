import { LocationProps } from '@/types/types';
import * as Location from 'expo-location'
import { useState } from 'react';
import WatchLocation from './WatchLocation';

// Coords of the user
export  async function GetCoordsOfUser() {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
    }
    
    const getLocation = await Location.getCurrentPositionAsync();
    return getLocation.coords

  } catch (error) {
    console.log("Error getting location:", error);
    return null
  }
}

// Coords of the Driver
export  async function GetCoordsOfDriver() {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
    }
    const watchLocation =  await WatchLocation()
    if(watchLocation){
      // const obj = {
                //     from: { latitude: newLocation.latitude, longitude: newLocation.longitude },
                //     to: { latitude: destinationLocation?.latitude || 0, longitude: destinationLocation?.longitude || 0 }
                // }
                // const cenpoints = DataLatLon(obj).then((coords) => {
                //     socket.emit('update-location', {
                //         driverId: userData?._id,
                //         clientId: userdata?.payload.clientId,
                //         routes: coords
                //     }
                //     )
                // }).catch((err) => { console.log("error when getting the coords", err) })  
    }
  } catch (error) {
    console.log("Error getting location:", error);
  }
};
