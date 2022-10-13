import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import { toLatLng } from './utils/utils'
import usePlaces from './hooks/usePlaces'
import axios from 'axios'
import { useState } from 'react';

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
  const { setLocation, setShowPopup } = props
  const { loading, places, searchPlaces } = usePlaces([])
  const { toid, setToid } = useState('');

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
            axios.get(`https://api.os.uk/search/links/v1/identifierTypes/UPRN/${newValue.UPRN}?key=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
              let ids = response.data.correlations;
              let toid = ids.find(c => c.correlatedFeatureType === 'TopographicArea');
              console.log(toid);
            }) 
            // axios.get(`
            // https://api.os.uk/features/v1/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=Topography_TopographicPoint&count=20&key=${process.env.REACT_APP_API_KEY}`)
            // .then(response => {
            //   console.log(response.data);
            // });
            axios.get(`https://api.os.uk/maps/vector/v1/vts?srs=3857&key=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
              console.log(response.data);
            }) 
          }
        }}
        onInputChange={(event, newValue) => {
          if(newValue.length > 0) {
            searchPlaces(newValue)
          }
        }}
      />
    </SearchContainer>
  )
}

export default Search

