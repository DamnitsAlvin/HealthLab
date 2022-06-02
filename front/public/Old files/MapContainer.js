import React from 'react'
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react'


export class MapContainer extends React.Component{
   
    render(){
        return(
            <Map 
                google={this.props.google}
                style={{width: 'inherit', height:'inherit'}}
                className={'map'}
                initialCenter={
                    {
                        lng: 120.9842195,
                        lat: 14.5995124, 

                    }
                }
                zoom={20}>

           
        
            
          </Map>
        )
    }

   
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)