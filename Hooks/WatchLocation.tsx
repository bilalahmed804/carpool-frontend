import { LocationProps } from '@/types/types';
import * as Location from 'expo-location'
import { getDistance } from 'geolib'
import { useState } from 'react';
import DataLatLon from './PolyLine_Data';

// watch if the driver move the his location with in the 10 meter

export default async function WatchLocation() {
    const [lastSentLocation, setLastSentLocation] = useState<LocationProps | null>(null);
    try {
        const getLocation = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 5000,
                distanceInterval: 10,
            },
            (getLocation) => {
                const newLocation = {
                    latitude: getLocation.coords.latitude,
                    longitude: getLocation.coords.longitude,
                };
                if (lastSentLocation) {
                    const distance = getDistance(lastSentLocation, newLocation);
                    console.log("distance ", distance)
                    if (distance < 15) {
                        return 
                    }
                }

                console.log("Location Updated: ", newLocation);
                setLastSentLocation(newLocation);
                return newLocation
            })
    } catch (error) {
        console.log("error when watching the location ", error)
        return []
    }


}