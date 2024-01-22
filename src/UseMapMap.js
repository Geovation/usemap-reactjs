import React, { useEffect, useRef, useState } from 'react'

import Map, { Layer } from 'react-map-gl/maplibre'

import MapPopup from './MapPopup'
import OSMapLogo from './OSMapLogo'

function UseMapMap (props) {
  const {
    location,
    selectedPlace,
    showBuildingModal,
    showMapPopup,
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
      mapRef.current.flyTo({ center: location, zoom: 19, essential: true })
    }
  }, [location])

  const heightLayer = {
    id: 'OS/TopographicArea_2/Building/1_3D',
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
        ['get', 'RelHMax']
      ],
      'fill-extrusion-opacity': 0.7
    }
  }

  const toidLayerFill = {
    id: 'OS/TopographicArea_2/Building/1',
    type: 'fill',
    source: 'esri',
    'source-layer': 'TopographicArea_2',
    filter: ['all', ['==', '_symbol', 4], ['==', 'TOID', selectedTOID]],
    minzoom: 15,
    layout: {},
    visibility: true,
    paint: {
      'fill-color': '#008FFF',
      'fill-opacity': 0.4
    }
  }

  const toidLayerLine = {
    id: 'OS/TopographicArea_2/Building/1',
    type: 'line',
    source: 'esri',
    'source-layer': 'TopographicArea_2',
    filter: ['all', ['==', '_symbol', 4], ['==', 'TOID', selectedTOID]],
    minzoom: 15,
    layout: {},
    visibility: true,
    paint: {
      'line-color': '#008FFF',
      'line-width': 3,
      'line-opacity': 0.8
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
          zoom: 8
        }}
        minZoom={6}
        mapLib={maplibregl}
        customAttribution={
          'Contains OS data &copy; Crown copyright and database rights 2023'
        }
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: 'calc(100% - 0px)'
        }}
        mapStyle='/OS_VTS_3857_Light_UseMap.json'
        transformRequest={url => {
          if (!url.includes('key=')) {
            url += `?key=${process.env.REACT_APP_OS_MAP_KEY}`
          }
          return {
            url: url + '&srs=3857'
          }
        }}
      >
        <Layer {...toidLayerFill} />
        <Layer {...toidLayerLine} />
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
