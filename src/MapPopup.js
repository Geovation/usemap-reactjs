import * as React from 'react'

import Link from '@mui/material/Link'

import { Popup } from 'react-map-gl'

import MapTable from './MapTable'

function MapPopup (props) {
  const { tableData, location, toggleModal, setShowMapPopup } = props

  return (
    <Popup
      longitude={location[0]}
      latitude={location[1]}
      closeOnClick={false}
      anchor='bottom'
      onClose={() => setShowMapPopup(false)}
    >
      <MapTable tableData={tableData} />
      <Link onClick={toggleModal} href='#'>
        More Info About This Building
      </Link>
    </Popup>
  )
}

export default MapPopup
