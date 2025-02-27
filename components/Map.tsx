import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('screen');

interface LocationProps {
    latitude: number;
    longitude: number;
}
interface regionType {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

export default function Map() {
    const [pickupLocation, setPickupLocation] = useState<LocationProps | null>(null);
    const [destinationLocation, setDestinationLocation] = useState<LocationProps | null>(null);
    const mapRef = useRef<MapView | null>(null);
    const apikey = process.env.EXPO_PUBLIC_API_KEY;
    const [region , setRegion] = useState<regionType>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    return (
        <MapView
            style={{ width: width, height: height * 0.49 }}
            ref={mapRef}
            showsCompass={true}
            showsTraffic={true}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
        >
            {pickupLocation && destinationLocation ? (
                <>
                    <Marker
                        coordinate={pickupLocation}
                        title="Pickup Location"
                        description="This is your pickup location"
                        pinColor="blue"
                    />
                    <Marker
                        coordinate={destinationLocation}
                        title="Destination Location"
                        description="This is your destination"
                        pinColor="red"
                    />
                </>
            ) : null}
        </MapView>
    );
}
