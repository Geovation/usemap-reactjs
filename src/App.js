import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import MapUpMap from './MapUpMap';

import './App.css';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <MapUpMap />
    </React.Fragment>
  );
}

export default App;
