import axios from "axios"
import polyline from '@mapbox/polyline'
import { Lat_Long_props } from "@/types/types";

const DataLatLon = async (data: Lat_Long_props) => {
    const ApiKey = process.env.EXPO_PUBLIC_API_KEY;
 
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${data.from.latitude},${data.from.longitude}&destination=${data.to.latitude},${data.to.longitude}&key=${ApiKey}`)
        if (response?.data) {
            const routes = response.data.routes;
            if (routes.length === 0) {
                console.log("No routes found!");
                return;
            }
            
            const encodeedPoints = response.data.routes[0]?.overview_polyline?.points;
           if(encodeedPoints){
            const decodedPonits =  polyline.decode(encodeedPoints, 5).map(([latitude, longitude])=> ({
                latitude,
                longitude
            }))
            return decodedPonits
           }
        }
    } catch (error) {
        console.log("error when getting latlon form google API", error)
        return []
    }
}

export default DataLatLon;