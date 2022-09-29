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

import './App.css'
import 'maplibre-gl/dist/maplibre-gl.css'

function App () {
  const [location, setLocation] = useState([-1.471061, 50.9382])
  const [styleVal, setStyleVal] = useState('positron')

  function changeStyle (name) {
    setStyleVal(name)
  }
  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar>
          <Search setLocation={setLocation} />
          <Box variant='h6' component='div' sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            orientation='horizontal'
            value='val'
            exclusive
          >
            <ToggleButton onClick={() => changeStyle('dark-matter')} value='dark-matter' aria-label='dark-matter'>
              <DarkModeIcon />
            </ToggleButton>
            <ToggleButton onClick={() => changeStyle('positron')} value='positron' aria-label='positron'>
              <WbSunnyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      <MapUpMap location={location} styleVal={styleVal} />
      <Footer />
    </>
  )
}

export default App
