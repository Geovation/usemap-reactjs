import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Popup } from 'react-map-gl'

function MapPopup (props) {
  const { tableData, location } = props
  return (
    <Popup
      maxWidth='40%'
      style={{ fontFamily: 'Trebuchet MS, Arial, sans-serif' }}
      longitude={location[0]} latitude={location[1]}
      closeOnClick={false}
      interactiveLayerIds={['topographic-areas']}
      anchor='bottom'
    >
      <TableContainer component={Paper}>
        <Table sx={{ wordWrap: 'break-word', width: '100%' }} size='small' aria-label='info'>
          <TableHead>
            <TableRow>
              <TableCell colSpan='2' align='center'>{tableData.address}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.data.map((row) => (
              <TableRow
                key={row[0].toLowerCase()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-all' }} align='center'>{row[0]}</TableCell>
                <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-word' }} align='center'>{row[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link href='#'>More Info About This Building</Link>
    </Popup>
  )
}

export default MapPopup
