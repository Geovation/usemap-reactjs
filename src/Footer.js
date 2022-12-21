import * as React from 'react'

import { styled, alpha } from '@mui/material/styles'

const FooterContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  bottom: 0,
  zIndex: 21,
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 1),
  width: '100%',
  height: '60px'
}))

const UseMapSpan = styled('span')(({ theme }) => ({
  postion: 'absolute',
  left: '10px',
  padding: 5
}))

const UseMapLink = styled('a')(({ theme }) => ({
  '&:link': {
    color: theme.palette.common.white
  },
  '&:hover': {
    color: theme.palette.common.red
  }
}))

function Footer () {
  return (
    <FooterContainer>
      <img
        alt='UseMap Logo'
        height='55'
        src={process.env.PUBLIC_URL + '/elelogo_transp.png'}
      />
      <UseMapSpan>
        UseMap | <UseMapLink href='#'>Terms and Conditions</UseMapLink>
      </UseMapSpan>
    </FooterContainer>
  )
}

export default Footer
