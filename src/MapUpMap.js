import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Map, { Layer, Popup, Source } from 'react-map-gl'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function MapUpMap (props) {
  const { location, setLocation, feature, getFeature, showPopup, setShowPopup } = props
  const [style, setStyle] = useState({})
  const mapRef = useRef()

  const onMapClick = () =>
    mapRef.current.on('click', (e) => {
      setShowPopup(false)
      const fs = mapRef.current.queryRenderedFeatures(e.point)
      if (fs.length > 0) {
        const building = fs.find(x => x.layer.id.includes('Building/'))
        if (building) {
          getFeature(building.properties.TOID)
        }
      }
      setLocation([e.lngLat.lng, e.lngLat.lat])
      setShowPopup(true)
    })

    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.flyTo({ center: location, zoom: 18, essential: true })
      }
    }, [location])
    

  const toidLayer = {
    id: 'topographic-areas',
    type: 'fill',
    layout: {
      visibility: 'visible'
    },
    paint: {
      'fill-color': '#3388ff',
      'fill-opacity': 0.4
    }
  }

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
      mapStyle={`https://api.os.uk/maps/vector/v1/vts/resources/styles?srs=3857&key=${process.env.REACT_APP_API_KEY}`}
      transformRequest={
        url => {
          return {
            url: url + '&srs=3857' // transforms tile data, not style
          }
        }
      }
    >
      <Source id='topographic-areas' type='geojson' data={feature}>
        <Layer {...toidLayer} />
      </Source>
      {showPopup &&
        <Popup
          longitude={location[0]} latitude={location[1]}
          closeOnClick={false}
          anchor='bottom'
        >
          <table style={{ textAlign: 'center' }}>
            <tbody>
            <tr><td>TOID</td><td>{feature.properties?.TOID ? feature.properties.TOID : ''}</td></tr>
            <tr><td>Group</td><td>{feature.properties?.DescriptiveGroup ? feature.properties.DescriptiveGroup : ''}</td></tr>
            <tr><td>Theme</td><td>{feature.properties?.theme ? feature.properties.theme : ''}</td></tr>
            <tr><td>Area (sq m)</td><td>{feature.properties?.calculatedAreaValue ? feature.properties.calculatedAreaValue : ''}</td></tr>
            </tbody>
          </table>
        </Popup>}
    </Map>
  )
}

export default MapUpMap
