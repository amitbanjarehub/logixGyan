import React from "react";
import { useState } from "react";
import { useGeolocated } from "react-geolocated";

const Geolocation = (lat,long) => {

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    
        const [long, setLong]= useState(0);
        const [lat, setLat]= useState(0);
        

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (

        setLat(coords.latitude)
        
    ): coords ? (

        setLong(coords.longitude)
        
    ) :
     (
    <div>Getting the location data&hellip; </div>
  
);
    
};

export default Geolocation;