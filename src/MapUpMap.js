import React from 'react'
import Map from 'react-map-gl'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function MapUpMap () {
  return (
    <Map
      initialViewState={{
        latitude: 50.9382,
        longitude: -1.471061,
        zoom: 16
      }}
      mapLib={maplibregl}
      style={{ position : 'fixed', left: 0, top: 60, width: '100vw', height: 'calc(100% - 120px)' }}
      mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
    />
  )
}

export default MapUpMap

// calc function CSS (100%-60px-90px)
