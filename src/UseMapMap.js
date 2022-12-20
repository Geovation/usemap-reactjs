import React, { useEffect, useRef, useState } from 'react'

import Map, { Layer } from 'react-map-gl'

import MapPopup from './MapPopup'
import OSMapLogo from './OSMapLogo'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'

function UseMapMap (props) {
  const {
    location,
    selectedPlace,
    showBuildingModal,
    showMapPopup,
    showBuildingHeights,
    setShowBuildingModal,
    setShowMapPopup,
    selectBuildingFromTOID
  } = props

  const [selectedTOID, setSelectedTOID] = useState(0)

  const mapRef = useRef()

  const onMapClick = e => {
    const features = mapRef.current.queryRenderedFeatures(e.point)
    if (features.length > 0) {
      const building = features.find(x => x.layer.id.includes('Building/'))
      if (building) {
        setSelectedTOID(building.properties.TOID)
        selectBuildingFromTOID(building.properties.TOID)
      }
    }
  }

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
    filter: ['all', ['==', '_symbol', 4], ['!=', 'TOID', selectedTOID]],
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
        showBuildingHeights ? ['get', 'RelHMax'] : 0
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
    filter: ['all', ['==', '_symbol', 4], ['==', 'TOID', selectedTOID]],
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
        showBuildingHeights ? ['get', 'RelHMax'] : 0
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
    title: selectedPlace ? selectedPlace.ADDRESS : 'No address',
    data: [
      [].concat(
        ['CLASSIFICATION_CODE', 'CLASSIFICATION_CODE_DESCRIPTION'].map(x => [
          x.replaceAll('_', ' '),
          selectedPlace && selectedPlace[x] ? selectedPlace[x] : ''
        ])
      )
    ][0]
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
        customAttribution={
          'Contains OS data &copy; Crown copyright and database rights 2022'
        }
        style={{
          position: 'fixed',
          left: 0,
          top: 60,
          width: '100vw',
          height: 'calc(100% - 120px)'
        }}
        mapStyle='https://raw.githubusercontent.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets/master/OS_VTS_3857_Light.json'
        transformRequest={url => {
          return process.env.REACT_APP_OS_MAP_KEY
        }}
      >
        <Layer {...toidLayer} />
        <Layer {...heightLayer} />

        {showMapPopup && (
          <MapPopup
            tableData={tableData}
            location={location}
            showBuildingModal={showBuildingModal}
            setShowBuildingModal={setShowBuildingModal}
            setShowMapPopup={setShowMapPopup}
          />
        )}
      </Map>
      <OSMapLogo />
    </>
  )
}

export default UseMapMap
