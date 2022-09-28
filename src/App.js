import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'

import AdbIcon from '@mui/icons-material/Adb'

import MapUpMap from './MapUpMap'
import Search from './Search'

import Header from './Header'
import Footer from './Footer'

import './App.css'
import 'maplibre-gl/dist/maplibre-gl.css'

function App () {
  const [location, setLocation] = useState([-1.471061, 50.9382])

  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar>
          <Search setLocation={setLocation} />
          <AdbIcon sx={{ mr: 1 }} />
        </Toolbar>
      </AppBar>
      <MapUpMap location={location} />
      <Footer />
    </>
  )
}

export default App
