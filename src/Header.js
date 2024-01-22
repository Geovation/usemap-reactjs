import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import Search from './Search'

function Header (props) {
  const { onSearchComplete } = props

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{ borderBottom: '1px solid #eeeeee', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    >
      <Toolbar>
        <Search onSearchComplete={onSearchComplete} />
        <Box variant='h6' component='div' sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
