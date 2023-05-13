import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import React from "react";
import { GOOGLE_API_KEY } from "../../config/env";
import icon from '../../assets/images/pin1.png'
import mapStyles from "../mapStyles";

const options = {
    // styles: mapStyles,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    disableDefaultUI: true
  }

const libraries = ["places"];

function StoreMap({ center, pharmacies }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


  console.log(center);
  return (
    <GoogleMap
      center={center}
      zoom={11}
      mapContainerStyle={{ maxWidth: "600px", height: '360px' }}
      options={options}
      onLoad={onMapLoad}
    >
        <MarkerF position={center}/>
      {pharmacies.map((p) => {
        return <MarkerF position={{lat:p.latitude, lng:p.longitude}} key={p.id} 
        icon={{
            url: icon,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(40, 40),

          }}
          />;
      })}
    </GoogleMap>
  );
}

export default StoreMap;