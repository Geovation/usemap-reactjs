import React, { useEffect, useRef } from 'react'
import Map, { Layer } from 'react-map-gl'
import MapPopup from './MapPopup.js'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function MapUpMap (props) {
  const { location, setLocation, feature, getFeature, heights, places, getBuildingFromTOID, showPopup, setShowPopup, toggleModal} = props
  const mapRef = useRef()

  const onMapClick = (e) => {
    setShowPopup(false)
    const fs = mapRef.current.queryRenderedFeatures(e.point)
    if (fs.length > 0) {
      const building = fs.find(x => x.layer.id.includes('Building/'))
      if (building) {
        getFeature(building.properties.TOID)
        getBuildingFromTOID(building.properties.TOID)
        setLocation([e.lngLat.lng, e.lngLat.lat])
        setShowPopup(true)
      } // otherwise no building found; no location update hence no building/feature update
    }
  }

  // useEffect section
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: location, zoom: 18, essential: true })
    }
  }, [location])

  const heightLayer = {
    id: 'OS/TopographicArea_2/Building/1_3D',
    type: 'fill-extrusion',
    source: 'esri',
    'source-layer': 'TopographicArea_2',
    filter: ['all',
      [
        '==',
        '_symbol',
        4
      ],
      [
        '!=',
        'TOID',
        feature && feature.properties ? feature.properties.toid : 0
      ]
    ],
    minzoom: 15,
    layout: {},
    visibility: true,
    paint: {
      'fill-extrusion-color': '#DCD7C6',
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        13,
        0,
        15.4,
        heights ? ['get', 'RelHMax'] : 0
      ],
      'fill-extrusion-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        16,
        0.9
      ]
    }
  }

  const toidLayer = {
    id: 'OS/TopographicArea_2/Building/TOIDmatch3D',
    type: 'fill-extrusion',
    source: 'esri',
    'source-layer': 'TopographicArea_2',
    filter: ['all',
      [
        '==',
        '_symbol',
        4
      ],
      [
        '==',
        'TOID',
        feature && feature.properties ? feature.properties.toid : 0
      ]
    ],
    minzoom: 15,
    layout: {},
    visibility: true,
    paint: {
      'fill-extrusion-color': '#008FFF',
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        13,
        0,
        15.4,
        heights ? ['get', 'RelHMax'] : 0
      ],
      'fill-extrusion-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        16,
        0.9
      ]
    }
  }

  const tableData = {
    address: places[0] ? places[0].ADDRESS : 'no address given',
    data:
    [[
      ['area (sq m)', feature && feature.properties && feature.properties.geometry_area ? parseInt(feature.properties.geometry_area) : ''],
      ['max height', feature && feature.properties && feature.properties.relativeheightmaximum ? feature.properties.relativeheightmaximum : 'none given']
    ].concat(
      ['CLASSIFICATION_CODE', 'CLASSIFICATION_CODE_DESCRIPTION'].map(x => [x.replaceAll('_', ''), places[0] && places[0][x] ? places[0][x] : 'none given']))][0]
  }

  return (
    <>
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
        customAttribution={'Contains OS data &copy; Crown copyright and database rights 2022'}
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
        <Layer {...toidLayer} />
        <Layer {...heightLayer} />

        {showPopup &&
          <MapPopup tableData={tableData} location={location} toggleModal = {toggleModal}/>}
      </Map>
      <div style={{ position: 'absolute', top: 'calc(100%-120px)', bottom: '60px', zIndex: 2, width: '100%' }}>
        <a
          href='https://www.ordnancesurvey.co.uk'
          style={{
            position: 'absolute',
            display: 'block',
            margin: 'auto',
            left: '10px',
            height: '50px',
            bottom: '10px',
            zIndex: '99999',
            overflow: 'hidden'
          }}
          target='_blank' rel='noreferrer'
        >
          <img
            src='https://raw.githubusercontent.com/OrdnanceSurvey/os-api-branding/4604a642bda5dc3c5e600f4cb095aa8a0934dc05/img/os-logo-maps.svg'
            width='120' alt='OS logo'
          />
        </a>
      </div>
    </>
  )
}

export default MapUpMap
