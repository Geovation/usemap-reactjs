import React, { useEffect, useRef } from 'react'
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

  const toidLayer = {
    id: 'building-fill',
    type: 'fill',
    data: { feature },
    paint: {
      'fill-color': '#3388ff',
      'fill-opacity': 1
    }
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
        <Source id='building-highlight' type='geojson' data={feature}>
          <Layer {...toidLayer} />
        </Source>
        {showPopup &&
          <Popup
            style={{ fontFamily: 'Trebuchet MS, Arial, sans-serif' }}
            longitude={location[0]} latitude={location[1]}
            closeOnClick={false}
            interactiveLayerIds={['topographic-areas']}
            anchor='bottom'
          >
            <table style={{ width: '100%', position: 'relative', tableLayout: 'fixed', textAlign: 'center' }}>
              <tbody>
                {(() => {
                // build popup text
                  const addr =
                [<tr key='addressrow'><td colSpan='2' key='addressvalue'>{places[0] ? places[0].ADDRESS : 'No name given'}</td></tr>]

                  const x = 'CalculatedAreaValue'
                  const tbl1 = // for info from TOID call
                    <tr key={x + 'row'}><td key={x + 'name'}>area (sq m)</td><td key={x + 'value'}>{feature && feature.properties && feature.properties[x] ? parseInt(feature.properties[x]) : ''}</td></tr>

                  const arr2 = ['UPRN', 'CLASSIFICATION_CODE', 'CLASSIFICATION_CODE_DESCRIPTION'] // for info from UPRN call
                  const tbl2 = arr2.map(x =>
                    <tr key={x + 'row'}><td style={{ wordWrap: 'break-word' }} key={x + 'name'}>{x.replaceAll('_', ' ').toLowerCase()}</td><td style={{ wordWrap: 'break-word' }} key={x + 'value'}>{places[0] && places[0][x] ? places[0][x] : 'none given'}</td></tr>
                  )

                  return places[0] ? addr.concat(tbl1, tbl2) : 'Building information not found'
                })()}
              </tbody>
            </table>
          </Popup>}
      </Map>
      <div style={{ position: 'absolute', top: 'calc(100%-100px)', bottom: '60px', zIndex: 2, width: '100%' }}>
        <a
          href='https://www.ordnancesurvey.co.uk'
          style={{
            position: 'absolute',
            display: 'block',
            height: '150px',
            width: '200px',
            left: '10px',
            bottom: '10px',
            textIndent: '-9999px',
            zIndex: '99999',
            overflow: 'hidden',
            backgroundImage: 'url("https://raw.githubusercontent.com/OrdnanceSurvey/os-api-branding/4604a642bda5dc3c5e600f4cb095aa8a0934dc05/img/os-logo-maps.svg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '10 0',
            backgroundSize: '150px 200px'
          }}
          target='_blank' rel='noreferrer'
        >t
        </a>
      </div>
    </>
  )
}

export default MapUpMap
