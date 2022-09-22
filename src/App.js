import React from 'react';

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import AdbIcon from '@mui/icons-material/Adb';

import MapUpMap from './MapUpMap';
import Search from './Search';

import Header from './Header';
import Footer from './Footer';

import './App.css';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  return (
    <React.Fragment>
      <Header/>
      <CssBaseline />
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar>
          <Search />
          <AdbIcon sx={{ mr: 1 }} />
        </Toolbar>
      </AppBar>
      <MapUpMap />
      <Footer/>
    </React.Fragment>
  );
}

export default App;
