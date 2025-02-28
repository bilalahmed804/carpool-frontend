//location props interface 
export interface LocationProps {
    latitude: number;
    longitude: number;
}

// region intialprops interface
export interface regionType {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}
// lat_long props interface
export interface Lat_Long_props {
    from: { latitude: number, longitude: number },
    to: { latitude: number, longitude: number }
}