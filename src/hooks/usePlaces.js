import { useState } from 'react'

import { PlacesAPI } from '../api/placesAPI'

const usePlaces = () => {
  const [loadingPlace, setLoadingPlace] = useState(false)
  const [loadingPlaces, setLoadingPlaces] = useState(false)
  const [places, setPlaces] = useState([])
  const [place, setPlace] = useState({})

  const getPlacesFromSearch = async search => {
    setLoadingPlaces(true)
    const response = await PlacesAPI.getPlacesFromSearch(search)
    setLoadingPlaces(false)
    setPlaces(response)
    return response
  }

  const getPlaceFromTOID = async toid => {
    setLoadingPlace(true)
    const response = await PlacesAPI.getPlaceFromTOID(toid)
    const place = response.length > 0 ? response[0] : {}
    setPlace(place)
    setLoadingPlace(false)
    return place
  }

  return {
    loadingPlace,
    loadingPlaces,
    place,
    places,
    getPlaceFromTOID,
    getPlacesFromSearch
  }
}

export default usePlaces
