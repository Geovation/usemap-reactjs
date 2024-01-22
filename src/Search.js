import * as React from 'react'

import { styled, alpha } from '@mui/material/styles'

import Autocomplete from '@mui/material/Autocomplete'
import InputBase from '@mui/material/InputBase'

import SearchIcon from '@mui/icons-material/Search'

import usePlaces from './hooks/usePlaces'

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #eeeeee',
  backgroundColor: alpha(theme.palette.primary.main, 0.9),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.8)
  },
  marginRight: theme.spacing(2),
  paddingRight: theme.spacing(2),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

function Search (props) {
  const { onSearchComplete } = props

  const { places, loadingPlaces, getPlacesFromSearch } = usePlaces()

  const onSearchChange = async (e, searchText) => {
    if (searchText.length > 0 && !loadingPlaces) {
      await getPlacesFromSearch(searchText)
    }
  }

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        disablePortal
        id='cmb-address-search'
        sx={{ width: 300, color: 'black' }}
        options={places}
        filterOptions={x => x}
        getOptionLabel={option => (option.ADDRESS ? option.ADDRESS : '')}
        renderInput={params => {
          const { InputLabelProps, InputProps, ...rest } = params
          return <StyledInputBase {...params.InputProps} {...rest} />
        }}
        onChange={(e, place) => onSearchComplete(place)}
        onInputChange={onSearchChange}
        loading={loadingPlaces}
        componentsProps={{ paper: { elevation: 0, outlined: true } }}
      />
    </SearchContainer>
  )
}

export default Search
