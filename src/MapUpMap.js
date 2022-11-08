import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Map, { Layer, Popup, Source } from 'react-map-gl'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function MapUpMap (props) {
  const { location, setLocation, feature, getFeature, places, getBuildingFromTOID, showPopup, setShowPopup } = props
  const mapRef = useRef()

  const onMapClick = (e) => {
      setShowPopup(false)
      const fs = mapRef.current.queryRenderedFeatures(e.point)
      if (fs.length > 0) {
        const building = fs.find(x => x.layer.id.includes('Building/'))
        if (building) 
        {
          getFeature(building.properties.TOID)
          getBuildingFromTOID(building.properties.TOID)
          setLocation([e.lngLat.lng, e.lngLat.lat])
          setShowPopup(true)
        }
        else //no building found; no location update hence no building/feature update
        {
          setShowPopup(true)
        }
      }
    }

    //useEffect section
    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.flyTo({ center: location, zoom: 18, essential: true })
      }
    }, [location])
    
    useEffect(() => {
      console.log(feature)
    }, [feature])

  const toidLayer = {
    id: 'topographic-areas',
    type: 'fill',
    layout: {
      visibility: 'visible'
    },
    paint: {
      'fill-color': '#3388ff',
      'fill-opacity': 1
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
      minZoom={6}
      mapLib={maplibregl}
      style={{
        position: 'fixed',
        left: 0,
        top: 60,
        width: '100vw',
        height: 'calc(100% - 120px)'
      }}
      mapStyle={`https://api.os.uk/maps/vector/v1/vts/resources/styles?srs=3857&key=${process.env.REACT_APP_OS_API_KEY}`}
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
          closeButton={false}
          anchor='bottom'
        >
          <table style={{ width: '100%', position:'relative', tableLayout: 'fixed', textAlign: 'center'}}>
            <tbody>
              {(() => {
                //build popup text
                let addr = 
                [<tr key={'addressrow'}><td colSpan='2' key={'addressvalue'}>{places[0] ? places[0]['ADDRESS'] : 'No name given'}</td></tr>]   
            
                let x = 'CalculatedAreaValue'
                let tbl1 = //for info from TOID call
                  <tr key={x + 'row'}><td key={x + 'name'}>area (sq m)</td><td key={x + 'value'}>{feature.properties && feature.properties[x] ? parseInt(feature.properties[x]) : ''}</td></tr>
             
                let arr2 = ['UPRN', 'CLASSIFICATION_CODE', 'CLASSIFICATION_CODE_DESCRIPTION'] //for info from UPRN call
                let tbl2 = arr2.map(x =>
                  <tr key={x + 'row'}><td style={{wordWrap: 'break-word'}} key={x + 'name'}>{x.replaceAll('_', ' ').toLowerCase()}</td><td style={{wordWrap: 'break-word'}} key={x + 'value'}>{places[0] && places[0][x] ? places[0][x] : 'none given'}</td></tr>
                )

                return places[0] ? addr.concat(tbl1, tbl2) : 'No building here'

              })()}
            </tbody>
          </table>
        </Popup>}
    </Map>
  )
}

export default MapUpMap
