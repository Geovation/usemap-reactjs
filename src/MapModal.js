import ReactModal from 'react-modal'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import MapTable from './MapTable'

export default function MapModal (props) {
  const { places, feature, showModal, toggleModal } = props

  const head = (
    <TableRow>
      <TableCell colSpan='2' align='center'>{places[0] || feature ? 'Info about selected building' : 'No building selected'}</TableCell>
    </TableRow>
  )

  const keys1 = places[0] ? Object.keys(places[0]) : []
  const body1 = keys1.map((key) => (
    <TableRow
      key={key.toLowerCase()}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-all' }} align='center'>{key.toLowerCase().replaceAll('_', ' ')}</TableCell>
      <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-word' }} align='center'>{places[0][key]}</TableCell>
    </TableRow>
  ))

  const keys2 = feature && feature.properties ? Object.keys(feature.properties) : []
  const body2 = keys2.map((key) => (
    <TableRow
      key={key.toLowerCase()}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-all' }} align='center'>{key.toLowerCase().replaceAll('_', ' ')}</TableCell>
      <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-word' }} align='center'>{feature.properties[key]}</TableCell>
    </TableRow>
  ))

  const body = body1.concat(body2)

  return (
    <ReactModal
      isOpen={showModal}
      style={{
        overlay: {
          zIndex: 100,
          width: 'max(200px, 80%)',
          height: 'max(400px, 50%)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
      ariaHideApp={false}
      contentLabel='Information about selected building'
    >
      <MapTable head={head} body={body} />
      <button
        style={{
          position: 'fixed',
          right: '10px',
          top: '10px',
          backgroundColor: 'transparent',
          fontSize: '24px',
          border: '0px solid black'
        }}
        onClick={toggleModal}
      >x
      </button>
    </ReactModal>
  )
}
