import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'

import { PlacesAPI } from './api/placesAPI'

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

const testData = [
  { label: 'Ordnance Survey', location: [-1.471061, 50.9382] },
  { label: 'Bradford on Avon', location: [-2.249391, 51.347659] },
  { label: 'Geovation', location: [-0.099754, 51.52435] },
  { label: 'Berwick upon Tweed', location: [-2.00477, 55.768824] }
]

function Search (props) {
  const { setLocation } = props
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={testData}
        getOptionLabel={option => option.label}
        style={{ width: 300 }}
        renderInput={params => {
          const { InputLabelProps, InputProps, ...rest } = params
          return <StyledInputBase {...params.InputProps} {...rest} />
        }}
        onChange={(event, newValue) => {
          if (newValue.location) { setLocation(newValue.location) }
          PlacesAPI.autofill(newValue.label).then((response) => {
            console.log(response.results.map(result => result.DPA.ADDRESS))
            /* only console-logging right now, but we can access
            the data and setLocation to coords of top response */
          })
        }}
      />
    </SearchContainer>
  )
}

export default Search
