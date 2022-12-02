import Modal from '@mui/material/Modal'

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
  // sort alphabetically
  body.sort(function (a, b) { return a.props.children[0].props.children.localeCompare(b.props.children[0].props.children) })

  return (
    <Modal
      open={showModal}
      disableEnforceFocus
      style={{
        backgroundColor: 'black',
        padding: 20,
        zIndex: 100,
        width: 'max(200px, 80%)',
        height: 'max(400px, 50%)',
        position: 'absolute',
        overflowY: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <>
        <MapTable head={head} body={body} />
        <button
          style={{
            position: 'absolute',
            right: '30px',
            top: '20px',
            backgroundColor: 'transparent',
            fontSize: '24px',
            border: '0px solid black'
          }}
          onClick={toggleModal}
        >x
        </button>
      </>
    </Modal>
  )
}
