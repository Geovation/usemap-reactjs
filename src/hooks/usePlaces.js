import { PlacesAPI } from '../api/placesAPI'
import { useState } from 'react'

const usePlaces = () => {
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

  return { loading, places, searchPlaces }
}

export default usePlaces
