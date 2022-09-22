import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'

const HeaderContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 20,
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: 'solid black',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  width: '100%',
  height: '60px'
}))

function Header () {
  return <HeaderContainer />
}

export default Header
