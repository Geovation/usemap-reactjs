import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Map, { Popup } from 'react-map-gl'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function MapUpMap (props) {
  const { location, styleVal, showPopup, setShowPopup} = props
  const [style, setStyle] = useState({})
  const mapRef = useRef()

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: location, zoom: 18, essential: true })
    }
    axios.get(`https://api.os.uk/maps/vector/v1/vts/resources/styles?srs=3857&key=${process.env.REACT_APP_API_KEY}`)
    .then(function (response) {
      setStyle(response.data)
    });
  }, [location, styleVal])

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
      mapStyle={style}
      transformRequest={
        url => {
          return {
              url: url + '&srs=3857' //transforms tile data, not style
          }
        }
      }
    >
      {showPopup && (
      <Popup longitude={location[0]} latitude={location[1]}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        You are here
      </Popup>)}
      </Map>
  )
}

export default MapUpMap
