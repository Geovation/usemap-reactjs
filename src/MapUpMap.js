import React, { useState, useEffect } from 'react'
import { Map, useMap } from 'react-map-gl'
import { testData } from './Search'

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl'
import axios from 'axios'

import proj4 from 'proj4'

function MapUpMap () {
  const mapRef = React.useRef()

  const serviceUrl = 'https://api.os.uk/maps/vector/v1/vts'

  const map = (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: 50.9382,
        longitude: -1.471061,
        zoom: 12
      }}
      mapLib={maplibregl}
      style={{ width: '100vw', height: '100vh' }}
    // two other ways to get styles: either through an API call or from github raw. take your pick.
    // mapStyle={serviceUrl + "/resources/styles?srs=3857&key=" + apiKey}
    // mapStyle="https://raw.githubusercontent.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets/master/OS_VTS_3857_Light.json"
      mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
    />
  )

  // const [query, setQuery] = useState("");
  // async function find (value) {
  //   axios.get('https://api.os.uk/search/names/v1/find?query=' + value + '&key=' + apiKey)
  //     .then(function (response) {
  //       /* For explanation and debugging purposes we display the full response from the API in the console */
  //       const place = response.data
  //       console.log(place.header.totalresults == 0 ? 'no place found' : place.header.totalresults + ' places found')
  //       if (place.header.totalresults > 0) {
  //         const entry = place.results[0].GAZETTEER_ENTRY
  //         const x = entry.GEOMETRY_X
  //         const y = entry.GEOMETRY_Y
  //         console.log(x, y)
  //         const coords = OStoLngLat(x, y)
  //         console.log('Result found at ' + entry.NAME1 + ', ' + entry.COUNTY_UNITARY + ', ' + entry.COUNTRY)
  //         console.log(coords)
  //         mapRef.current.flyTo({
  //           center: coords,
  //           essential: true,
  //           zoom: 14
  //         })
  //       }

  //       return JSON.stringify(response.data, null, 2)
  //     })

  async function find (value) {
    const result = testData.find(element => {
      return element.label == value
    })
    const coords = result.location
    mapRef.current.flyTo({
      center: coords,
      essential: true,
      zoom: 14
    })
  }

  useEffect(() => {
    document.getElementById('search').addEventListener('click', () => {
      document.title = document.getElementById('combo-box-demo').value
      find(document.getElementById('combo-box-demo').value)
    })
  })

  function OStoLngLat (northing, easting) {
    proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs')
    const coords = proj4('EPSG:27700', 'EPSG:4326').forward([northing, easting])
    return coords
  }

  return (
    map
  )
}

// var result = val.GAZETTEER_ENTRY;
// proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs');
// var coords = proj4('EPSG:27700', 'EPSG:3857', [ result.GEOMETRY_X, result.GEOMETRY_Y ]);
export default MapUpMap
