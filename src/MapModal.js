import Modal from '@mui/material/Modal'

import MapTable from './MapTable'

function MapModal (props) {
  const { tableData, showModal } = props

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
        <MapTable tableData={tableData} />
      </>
    </Modal>
  )
}

export default MapModal
