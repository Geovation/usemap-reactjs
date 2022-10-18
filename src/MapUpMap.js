import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Map, { Popup } from 'react-map-gl'
import useFeatures from './hooks/useFeatures'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function MapUpMap (props) {
  const { location, setLocation, showPopup, setShowPopup } = props
  const [style, setStyle] = useState({})
  const { l, feature, getFeature } = useFeatures({})
  const mapRef = useRef()

  const onMapClick = () =>
    mapRef.current.on('click', (e) => {
      const fs = mapRef.current.queryRenderedFeatures(e.point)
      if (fs.length > 0) {
        const building = fs.find(x => x.layer.id.includes('Building/'))
        if (building && !l) {
          getFeature(building.properties.TOID)
        }
      }
      setShowPopup(false)
      setLocation([e.lngLat.lng, e.lngLat.lat])
      setShowPopup(true)
    })

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: location, zoom: 18, essential: true })
      axios.get(`https://api.os.uk/maps/vector/v1/vts/resources/styles?srs=3857&key=${process.env.REACT_APP_API_KEY}`)
        .then(function (response) {
          setStyle(response.data)
        })
    }
  }, [location])

  return (
    <Map
      ref={mapRef}
      onClick={onMapClick}
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
            url: url + '&srs=3857' // transforms tile data, not style
          }
        }
      }
    >
      {showPopup &&
        <Popup
          longitude={location[0]} latitude={location[1]}
          closeOnClick={false}
          anchor='bottom'
        >
          {feature ? feature.geometry.coordinates[0] : 'no building here'}
        </Popup>}
    </Map>
  )
}

export default MapUpMap
