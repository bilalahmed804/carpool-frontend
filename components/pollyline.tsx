import React from "react";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";

type RoutePolylineProps = {
  routeCoordinates: { latitude: number; longitude: number }[];
};

const RoutePolyline = ({ routeCoordinates }: RoutePolylineProps) => {

  if (!routeCoordinates || routeCoordinates.length < 2) {
    return <View style={styles.errorContainer}><Text>No valid route</Text></View>;
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: routeCoordinates[0].latitude,
        longitude: routeCoordinates[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Polyline
        coordinates={routeCoordinates}
        strokeWidth={4}
        strokeColor="#1E90FF" 
      />

      <Marker coordinate={routeCoordinates[0]} title="Start" pinColor="green" />

      <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]} title="Destination" pinColor="red" />
    </MapView>
  );
};

export default RoutePolyline;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
