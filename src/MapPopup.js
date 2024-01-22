import * as React from 'react'

import { Popup } from 'react-map-gl'

import MapTable from './MapTable'

function MapPopup (props) {
  const { tableData, location, setShowMapPopup } = props

  return (
    <Popup
      longitude={location[0]}
      latitude={location[1]}
      closeOnClick={false}
      anchor='top'
      onClose={() => setShowMapPopup(false)}
    >
      <MapTable tableData={tableData} />
    </Popup>
  )
}

export default MapPopup
