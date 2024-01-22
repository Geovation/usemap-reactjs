import * as React from 'react'

import { styled } from '@mui/material/styles'

const FooterContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  bottom: 0,
  zIndex: 21,
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(1)
}))

function Footer () {
  return (
    <FooterContainer>
      <img
        alt='UseMap Logo'
        height='95'
        src={process.env.PUBLIC_URL + '/elelogo_transp.png'}
      />
    </FooterContainer>
  )
}

export default Footer
