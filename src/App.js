import React from 'react'

import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'

import AdbIcon from '@mui/icons-material/Adb'
import Button from '@mui/material/Button'
import MapUpMap from './MapUpMap'
import Search from './Search'

import Header from './Header'
import Footer from './Footer'

import './App.css'
import 'maplibre-gl/dist/maplibre-gl.css'

function App () {
  return (
    <>
      <Header />
      <CssBaseline />
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar>
          <Search />
          <Button style={{ width: 50, height: 50, padding: 5 }} id='search'>Search</Button>
          <AdbIcon sx={{ mr: 1 }} />
        </Toolbar>
      </AppBar>
      <MapUpMap />
      <Footer />
    </>
  )
}

export default App
