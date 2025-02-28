import { LocationProps, regionType } from '@/types/types';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { images } from '@/assets/index';

const { width, height } = Dimensions.get('screen');

interface MapProps {
    pickup_latlon: LocationProps,
    destination_latlon: LocationProps,
    initial_Route: regionType
}


export default function Map({ pickup_latlon, destination_latlon, initial_Route }: MapProps) {

    const [pickupLocation, setPickupLocation] = useState<LocationProps | null>(null);
    const [destinationLocation, setDestinationLocation] = useState<LocationProps | null>(null);
    const mapRef = useRef<MapView | null>(null);
    const apikey = process.env.EXPO_PUBLIC_API_KEY;
    const [region, setRegion] = useState<regionType | null>(null)

    useEffect(() => {
        if (pickup_latlon) {
            setPickupLocation(pickup_latlon)
        }
        if (destination_latlon) {
            setDestinationLocation(destination_latlon)
        }
        if (initial_Route) {
            setRegion(initial_Route)
        }
    }, [pickup_latlon, destination_latlon, initial_Route])


    return (
        // map view
        <MapView
            style={{ width: width, height: height * 0.49 }}
            ref={mapRef}
            showsCompass={true}
            showsTraffic={true}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={region || {
                latitude: 24.8607,
                longitude: 67.0011,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {/* pickup markup and destination markup */}
            {pickupLocation && destinationLocation ? (
                <>
                    <Marker
                        coordinate={pickupLocation}
                        title="You"
                        description="This is your pickup location"
                    >
                        <View style={{ width: "auto", height: "auto" }}>
                            <Image
                                source={{ uri: images.oval_1_png }}
                                resizeMode='contain'
                                style={{ width: '100%', height: "100%" }}
                            />
                        </View>
                    </Marker>
                    <Marker
                        coordinate={destinationLocation}
                        title="Destination Location"
                        description="This is your destination"
                    >
                         <View style={{ width: "auto", height: "auto" }}>
                            <Image
                                source={{ uri: images.Marker_png}}
                                resizeMode='contain'
                                style={{ width: '100%', height: "100%" }}
                            />
                        </View>
                    </Marker>
                </>
            ) : null}

            {/* Poly_line with the help of react native map directions */}
            {pickupLocation && destinationLocation && (
                <MapViewDirections
                    origin={pickupLocation}
                    destination={destinationLocation}
                    apikey={apikey || ""}
                    strokeWidth={2.5}
                    strokeColor="blue"
                />
            )}
        </MapView>
    );
}
