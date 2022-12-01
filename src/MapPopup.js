import * as React from 'react'
import Link from '@mui/material/Link'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Popup } from 'react-map-gl'
import MapTable from './MapTable'

function MapPopup (props) {
  const { tableData, location, toggleModal } = props

  let head = 
  <TableRow>
    <TableCell colSpan='2' align='center'>{tableData.address}</TableCell>
  </TableRow>

  let body = tableData.data.map((row) => (
    <TableRow
      key={row[0].toLowerCase()}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-all' }} align='center'>{row[0]}</TableCell>
      <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-word' }} align='center'>{row[1]}</TableCell>
    </TableRow>
  ))

  return (
    <Popup
      maxWidth='40%'
      style={{ fontFamily: 'Trebuchet MS, Arial, sans-serif' }}
      longitude={location[0]} latitude={location[1]}
      closeOnClick={false}
      interactiveLayerIds={['topographic-areas']}
      anchor='bottom'
    >
      <MapTable head={head} body={body} />
      <Link onClick={toggleModal} href='#'>More Info About This Building</Link>
    </Popup>
  )
}

export default MapPopup
