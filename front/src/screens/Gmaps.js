import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from './mapStyles'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import { formatRelative } from "date-fns";
const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw',
    height:'100vh'
}
const options = {
    styles: mapStyles, 
    disableDefaultUI: true, 
    zoomControl: true
}


export default function GMaps(){
    const [position, setPosition] = useState({latitude:"", longitude: ""})
    const [markers, setmarkers] = useState([])
    const [selected, setSelected] = useState()
    const [radius, setRadius] = useState(5000)
    const [hospitals, sethospitals] = useState()

    function getLocation(){
        if ("geolocation" in navigator) {
           navigator.geolocation.getCurrentPosition(function(position){
               setPosition({latitude: position.coords.latitude, 
                            longitude: position.coords.longitude})
           });
        } else { 
           setPosition({error: "No geolocation function"})
        }
    }

    useEffect(()=>{
        getLocation()
    }, [])

    useEffect( async()=>{
        if(position){
            const proxyurl = "https://enigmatic-everglades-21603.herokuapp.com/"
            const gmapsurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&location=${position.latitude}%2C${position.longitude}&radius=${radius}&type=hospital`
            fetch(proxyurl + gmapsurl).then(response =>response.json()).then(sethospitals).catch(()=>console.log("errors"))
        }
    }, [position, radius])

    useEffect(()=>{
        if(hospitals){
            for(let i=0; i<hospitals.results.length; i++){
                console.log("information:", hospitals.results[i])
                setmarkers((current) =>[
                    ...current, 
                    {
                        lat: hospitals.results[i].geometry.location.lat,
                        lng: hospitals.results[i].geometry.location.lng,
                        name: hospitals.results[i].name,
                        icon: hospitals.results[i].icon, 
                        image: hospitals.results[i].photos
                    },
                ])
            }
        }
    }, [hospitals])

    console.log("position:", position)
    
    const mapRef = useRef()
    const onMapLoad = useCallback((map)=>{
        mapRef.current = map
    }, [])

    const onMapClick = useCallback((event)=>{
        setmarkers((current) =>[
            ...current, 
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
            },
        ])
    })


    const center = {
        lat: position.latitude ,
        lng: position.longitude,
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY, 
        libraries
    })

    if(loadError) return "Error Loading maps"; 
    if(!isLoaded) return "Loading Maps"

    return(
        <div>
            
            <GoogleMap 
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}
            options={options}
            onLoad={onMapLoad}>
                {
                   markers &&  markers.map((mark,index) =>
                    (
                    <Marker 
                    key={index}
                    position={{
                        lat: mark.lat, 
                        lng: mark.lng, 
                    }}
                    icon={{
                        url:"/img/svg icons/care.svg", 
                        scaledSize: new window.google.maps.Size(60,60), 
                        origin: new window.google.maps.Point(0,0), 
                        anchor: new window.google.maps.Point(15,15)
                    }}
                    onClick={()=>{
                        setSelected(mark)
                    }}
                    ></Marker>
                    )
                    )
                }
                {selected ? <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=>{{
                    setSelected(null)
                }}}>
                    <div>
                        <h5>Hospitals found</h5>
                        <p>Name: {selected.name}</p>
                        <p>Lat: {selected.lat}</p>
                        <p>Longitude: {selected.lng}</p>
                    </div>
                </InfoWindow>: null}
            </GoogleMap>
            <Search/>
        </div>
    )
}


function Search(){
    const {ready, value, suggestions: { status, data }, setValue, clearSuggestion} = usePlacesAutocomplete({
        requestOptions:{
            location: {lat :()=> 43.653225, lng: ()=>79.383188},
            radius: 200 * 1000, 
        }
    })
    return(
    <Combobox
        onSelect={ async(address)=>{
            try{
                const result = await getGeocode({address})
                console.log(result[0])
            }
            catch(error){
                console.log(error)
            }
            console.log(address)
    }}
    >
        <ComboboxInput 
        value={value} 
        onChange={(e)=>{setValue(e.target.value)}}
        disabled={!ready}
        placeholder="Enter an address"
        />
        <ComboboxPopover>
            {status ==="OK" && data.map(({id, description})=>(
                <ComboboxOption key={id} value={description}/>
            ))}
        </ComboboxPopover>

        

    </Combobox>
    )
}