import { LocationProps, regionType } from '@/types/types';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { images } from '@/assets/index';
import { GetCoordsOfUser } from '@/Hooks/GetCoords';

const { width, height } = Dimensions.get('screen');


interface MapProps {
    pickup_latlon: LocationProps,
    destination_latlon: LocationProps,
    showtimeandate : boolean
}


export default function Map({ pickup_latlon, destination_latlon , showtimeandate }: MapProps) {

    const [time , setTime ] = useState(0)
    const [distance , setdistance ] = useState(0)
    const [pickupLocation, setPickupLocation] = useState<LocationProps | null>(null);
    const [destinationLocation, setDestinationLocation] = useState<LocationProps | null>(null);
    const mapRef = useRef<MapView | null>(null);
    const apikey = process.env.EXPO_PUBLIC_API_KEY;

    const [region, setRegion] = useState<regionType | null>(null)

    useEffect(() => {
        const accesslocation = async () => {
            // pickup location
            if (pickup_latlon) {
                const data = {
                    ...pickup_latlon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
                setPickupLocation(data)
                if (mapRef.current) {
                    setTimeout(() => {
                        mapRef.current?.animateToRegion(data, 1000);
                    }, 1000);
                }
            }

            // destination location 
            if (destination_latlon) {
                setDestinationLocation(destination_latlon)
            }

            // inital routes 
            const intialroutes = await GetCoordsOfUser();
            if (intialroutes?.latitude && intialroutes?.longitude) {
                setRegion({
                    ...intialroutes,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            }
        }
        accesslocation()
    }, [pickup_latlon, destination_latlon])
    console.log("distance", distance);
    console.log("time" , time)

    return (
        // map view

        <MapView
            style={{ width: width, height: height * 0.9 }}
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
                        <View style={styles.markerContainer}>
                            <Image
                                source={images.oval_1_png}
                                resizeMode='contain'
                                style={styles.markerImage}
                            />
                        </View>
                    </Marker>
                    <Marker
                        coordinate={destinationLocation}
                        title="Destination Location"
                        description="This is your destination"

                    >
                        <View style={styles.markerContainer}>
                            <Image
                                source={images.Marker_png}
                                resizeMode='contain'
                                style={styles.markerImage}
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
                    strokeWidth={4}
                    strokeColor="#1D1616"
                    onReady={(result)=>{
                        if(showtimeandate){
                            const timee= Number(result.duration);
                            const distance = Number(result.distance);
                            setTime(parseFloat(timee.toFixed(2)))
                            setdistance(parseFloat(distance.toFixed(2)))
                        }
                    }}
                />
            )}
            
        </MapView>
    );
}



const styles = StyleSheet.create({
    markerContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center", 
        borderRadius: 25, 
        backgroundColor: "rgba(255, 255, 100, 0.3)",
        shadowColor: "#626F47", 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 4, 
        elevation: 10, 
    },
    markerImage: {
        width: 40,
        height: 40,
    },
});
