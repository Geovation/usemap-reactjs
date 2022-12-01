import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import MapUpMap from './MapUpMap'
import Search from './Search'

import Header from './Header'
import Footer from './Footer'

import usePlaces from './hooks/usePlaces'
import useFeatures from './hooks/useFeatures'
import useLinkedIDs from './hooks/useLinkedIDs'

import { toLatLng } from './utils/utils.js'

import MapModal from './MapModal.js'

import './App.css'
import 'maplibre-gl/dist/maplibre-gl.css'

function App () {
  const [location, setLocation] = useState([-1.471061, 50.9382])
  const { feature, getFeature } = useFeatures()
  const { loading, places, searchPlaces, getBuildingFromTOID } = usePlaces([])
  const [showPopup, setShowPopup] = useState(false)
  const [heights, setHeights] = useState(true)
  const { linkedIDs, getLinkedIDsFromUPRN } = useLinkedIDs()
  const [ showModal, setShowModal ] = useState(false)

  function changeHeights (name) {
    setHeights(name)
  }

  function onComplete (newValue) {
    if (newValue.X_COORDINATE && !loading) {
      const latlng = toLatLng({ ea: newValue.X_COORDINATE, no: newValue.Y_COORDINATE })
      setShowPopup(false)
      getLinkedIDsFromUPRN(newValue.UPRN)
      const ids = linkedIDs.correlations
      const id = ids.find(c => c.correlatedFeatureType === 'TopographicArea')
      const toid = id.correlatedIdentifiers[0].identifier
      getFeature(toid)
      getBuildingFromTOID(toid)
      setLocation([latlng.lng, latlng.lat])
      setShowPopup(true)
    }
  }

  function toggleModal() {
    setShowModal(!showModal)
  }

  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar>
          <Search
            places={places} searchPlaces={searchPlaces} onComplete={onComplete}
          />
          <Box variant='h6' component='div' sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            orientation='horizontal'
            value='val'
            exclusive
          >
            <ToggleButton onClick={() => changeHeights(!heights)} value='toggle' aria-label='toggle'>
              {heights ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      <MapUpMap
        location={location} setLocation={setLocation} feature={feature} heights={heights} getFeature={getFeature} places={places}
        getBuildingFromTOID={getBuildingFromTOID} showPopup={showPopup} setShowPopup={setShowPopup} toggleModal={toggleModal}
      />
      <MapModal places={places} showModal={showModal} toggleModal={toggleModal}/>
      <Footer />
    </>
  )
}

export default App
