import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

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
  const { feature, getFeature } = useFeatures()
  const { loading, places, searchPlaces, getBuildingFromTOID } = usePlaces([])
  const [styleVal, setStyleVal] = useState('Light')
  const [showPopup, setShowPopup] = useState(false)

  function changeStyle (name) {
    setStyleVal(name)
  }

  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar>
          <Search
            setLocation={setLocation} setShowPopup={setShowPopup} feature={feature} loading={loading}
            places={places} searchPlaces={searchPlaces} getFeature={getFeature} getBuildingFromTOID={getBuildingFromTOID}
          />
          <Box variant='h6' component='div' sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            orientation='horizontal'
            value='val'
            exclusive
          >
            <ToggleButton onClick={() => changeStyle('Dark')} value='Dark' aria-label='Dark'>
              <DarkModeIcon />
            </ToggleButton>
            <ToggleButton onClick={() => changeStyle('Light')} value='Light' aria-label='Light'>
              <WbSunnyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      <MapUpMap
        location={location} setLocation={setLocation} feature={feature} getFeature={getFeature} places={places}
        getBuildingFromTOID={getBuildingFromTOID} styleVal={styleVal} showPopup={showPopup} setShowPopup={setShowPopup}
      />
      <Footer />
    </>
  )
}

export default App
