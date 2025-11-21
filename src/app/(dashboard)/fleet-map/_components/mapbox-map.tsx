"use client"

import Map from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"

function MapboxMap() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: 79.858333,
        latitude: 6.926944,
        zoom: 16,
        pitch: 45,
        bearing: 40,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/standard"
    />
  )
}

export default MapboxMap
