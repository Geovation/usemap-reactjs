import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Map, { Layer, Popup, Source } from 'react-map-gl'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'
import { toBNG } from './utils/utils'

function MapUpMap (props) {
  const { location, setLocation, feature, getFeature, places, getBuildingFromTOID, showPopup, setShowPopup } = props
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
          getBuildingFromTOID(building.properties.TOID)
          setLocation([e.lngLat.lng, e.lngLat.lat])
          setShowPopup(true)
        }
      }

    })

    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.flyTo({ center: location, zoom: 18, essential: true })
      }
      // let coords = toBNG({lng: location[0], lat: location[1]}, 0)
      // axios.get(`https://api.os.uk/search/places/v1/nearest?point=${coords.ea},${coords.no}&key=${process.env.REACT_APP_OS_API_KEY}`).then(
      //   (response => {
      //     response == undefined ? console.log(response.data.results[0].DPA) : 2
      //   })
      // )
    }, [location])
    

  const toidLayer = {
    id: 'topographic-areas',
    type: 'fill',
    layout: {
      visibility: 'visible'
    },
    paint: {
      'fill-color': '#3388ff',
      'fill-opacity': 0.6
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
      
      <Source id='topographic-source' type='geojson' data={feature}>
        <Layer {...toidLayer} />
      </Source>
      {showPopup &&
        <Popup
          style={{fontFamily: 'Trebuchet MS, Arial, sans-serif'}}
          longitude={location[0]} latitude={location[1]}
          closeOnClick={false}
          anchor='bottom'
        >
          <table style={{ textAlign: 'center', width: '40%'}}>
            <tbody>
              {(() => {
                let arr = ['CalculatedAreaValue'] //for info from TOID call
                let tbl1 = arr.map(x => <tr key={x + 'row'}><td key={x + 'name'}>{x}</td><td key={x + 'value'}>{feature.properties && feature.properties[x] ? feature.properties[x] : ''}</td></tr>)
                let tbl2 = Object.entries(places[0]) //for info from UPRN call
                .slice(12, 17)
                .map(x => <tr key={x[0] + 'row'}><td key={x[0] + 'name'}>{x[0]}</td><td key={x[0] + 'value'}>{x[1]}</td></tr>)
                return places[0] ? tbl1.concat(tbl2) : 'No building here'
              })()}
            </tbody>
          </table>
        </Popup>}
    </Map>
  )
}

export default MapUpMap
