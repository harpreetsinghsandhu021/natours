import React, { useState, useEffect, useRef } from "react";
import classes from "./Map.module.css";

import googleMapReact from "google-map-react";

const TourMap = () => {
  const mapRef = useRef();

  const center = [-34.397, 150.644];

  const zoom = 8;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom,
    });
  }, [center, zoom]);

  return (
    <div className={classes.map_wrap} ref={mapRef}>
      <googleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAwEggtL6Vrzu6sGm3Wf3zbl5VeGgMFOEk" }}
        defaultCenter={center}
        center={center}
        zoom={zoom}
      />
    </div>
  );
};

export default TourMap;
