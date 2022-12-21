import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import ToggleButton from '@mui/material/ToggleButton'

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWorkTwoTone'

import Search from './Search'

function Header (props) {
  const { showBuildingHeights, onSearchComplete, setShowBuildingHeights } =
    props

  return (
    <AppBar position='fixed' color='transparent' elevation={0}>
      <Toolbar>
        <Search onSearchComplete={onSearchComplete} />
        <Box variant='h6' component='div' sx={{ flexGrow: 1 }} />
        <ToggleButton
          size='small'
          value='heights'
          selected={showBuildingHeights}
          onChange={() => {
            setShowBuildingHeights(!showBuildingHeights)
          }}
        >
          <MapsHomeWorkIcon />
        </ToggleButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
