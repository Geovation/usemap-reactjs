import { PlacesAPI } from '../api/placesAPI'
import { useState } from 'react'

const usePlaces = () => {
  const [loading, setLoading] = useState(false)
  const [places, setPlaces] = useState([])

  const searchPlaces = (search) => {
    PlacesAPI.autofill(search).then((response) => {
      setLoading(true)
      return response
    })
      .then((response) => {
        setLoading(false)
        setPlaces(response)
      })
  }

  const getBuildingFromTOID = (search) => {
    PlacesAPI.getBuildingFromTOID(search).then((response) => {
      setLoading(true)
      return response
    })
      .then((response) => {
        setLoading(false)
        setPlaces(response)
      })
  }

  return { loading, places, searchPlaces, getBuildingFromTOID }
}

export default usePlaces
