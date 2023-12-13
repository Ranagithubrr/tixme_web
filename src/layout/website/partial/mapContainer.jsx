import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          alert(
            "Could not get your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <button onClick={getLocation}>Location</button>
      <div >
        <LoadScript googleMapsApiKey="key=AIzaSyDhWeUv_PRpblvaIoascl69mpTFEE7F2kc">
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={currentLocation}
            zoom={15}
          >
            {currentLocation && <Marker position={currentLocation} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapContainer;