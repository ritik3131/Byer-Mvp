import axios from "axios";
import React, { useEffect, useState } from "react";

function useGeolocation() {
  const [locations, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });
  let err = "",
  address = "";
  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
    address = reverseGeocodeCoordinates(location);
  };

  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  const reverseGeocodeCoordinates = async (location) => {
    const response = await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyBp59Y4uLclF-1k5UIOAAO04kzDgnMmfxU`
    );
    console.log(response);
    const address = response.data.results[0].formatted_address;
    return address;
  };

  const onError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        err = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        err = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        err = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        err = "An unknown error occurred.";
        break;
    }
  };

  useEffect(() => {
    if (!("geolocation" in navigator))
      err= "Geolocation not supported on your browser";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });

  return { err, address };
}

export default useGeolocation;
