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

import './App.css'
import 'maplibre-gl/dist/maplibre-gl.css'

function App () {
  const [location, setLocation] = useState([-1.471061, 50.9382])
  const { feature, getFeatureNGD } = useFeatures()
  const { loading, places, searchPlaces, getBuildingFromTOID } = usePlaces([])
  const [showPopup, setShowPopup] = useState(false)
  const [heights, setHeights] = useState(true)

  function changeHeights(name) {
    setHeights(name)
  }

  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar>
          <Search
            setLocation={setLocation} setShowPopup={setShowPopup} feature={feature} loading={loading}
            places={places} searchPlaces={searchPlaces} getFeatureNGD={getFeatureNGD} getBuildingFromTOID={getBuildingFromTOID}
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
        location={location} setLocation={setLocation} feature={feature} heights={heights} getFeatureNGD={getFeatureNGD} places={places}
        getBuildingFromTOID={getBuildingFromTOID} showPopup={showPopup} setShowPopup={setShowPopup}
      />
      <Footer />
    </>
  )
}

export default App
