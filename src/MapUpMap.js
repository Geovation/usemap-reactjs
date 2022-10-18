import React, { useEffect, useRef } from 'react'
import Map from 'react-map-gl'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function MapUpMap (props) {
  const { location, styleVal } = props
  const mapRef = useRef()

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: location, zoom: 18, essential: true })
    }
  }, [location])

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: location[1],
        longitude: location[0],
        zoom: 16
      }}
      mapLib={maplibregl}
      style={{
        position: 'fixed',
        left: 0,
        top: 60,
        width: '100vw',
        height: 'calc(100% - 120px)'
      }}
      mapStyle={`https://basemaps.cartocdn.com/gl/${styleVal}-gl-style/style.json`}
    />
  )
}

export default MapUpMap
