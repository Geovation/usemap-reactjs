import { PlacesAPI } from '../api/placesAPI'
import { useState, useEffect } from 'react'

const usePlaces = (url) => {
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState([])

  const searchPlaces = (search) => {
    PlacesAPI.autofill(search).then((response) => {
      return response
    })
      .then((response) => {
        setLoading(false)
        setPlaces(response)
      })
  }
  useEffect(() => {
    searchPlaces(url)
  }, [])

  return { loading, places, searchPlaces }
}

export default usePlaces;