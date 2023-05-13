import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";

import { GOOGLE_API_KEY } from "../../config/env";


const libraries = ['places']

import React, { useState } from 'react'
import { reverseGeocode } from "../../services/reverseGeocode";
import { useEffect } from "react";

function EditMap({center, location, setLocation, setAddress, height}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries
    
  })
  // const [newCenter, setNewCenter] = useState(center)
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = (e)=>{
    setLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
  }

  useEffect(()=>{
    reverseGeocode(location.lat, location.lng, setAddress)
    // setNewCenter({lat: location.lat, lng: location.lng})
  },[location.lat])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <GoogleMap
          center={center}
          zoom={11}
          mapContainerStyle={{ width: "100%",maxWidth:'600px', height: height }}
          onClick={onMapClick}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            clickableIcons: false
          }}
          onLoad={onMapLoad}
        >
          <MarkerF position={location} />
        </GoogleMap>
  )
}

export default EditMap