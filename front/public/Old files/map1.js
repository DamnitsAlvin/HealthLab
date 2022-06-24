import {useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api'

export default function Map1(){
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    return(
        <GoogleMap
            center= {
                center:{
                "lat": 48.8584, 
               "lng": 2.2945
            }
            }
            zoom={15}
            mapContainerStyle={{width: 100%, height: 100%}}
        >
            <Marker position={center}></Marker>

        </GoogleMap>
    )
}