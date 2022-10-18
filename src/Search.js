import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import { toLatLng } from './utils/utils'
import usePlaces from './hooks/usePlaces'

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

function Search (props) {
  const { setLocation } = props
  const { loading, places, searchPlaces } = usePlaces([])

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={places}
        filterOptions={(x) => x}
        getOptionLabel={option => option.ADDRESS ? option.ADDRESS : ''}
        style={{ width: 500 }}
        renderInput={params => {
          const { InputLabelProps, InputProps, ...rest } = params
          return <StyledInputBase {...params.InputProps} {...rest} />
        }}
        onChange={(event, newValue) => {
          if (newValue.X_COORDINATE && !loading) {
            const latlng = toLatLng({ ea: newValue.X_COORDINATE, no: newValue.Y_COORDINATE })
            setLocation([latlng.lng, latlng.lat])
          }
        }}
        onInputChange={(event, newValue) => {
          searchPlaces(newValue)
        }}
      />
    </SearchContainer>
  )
}

export default Search
