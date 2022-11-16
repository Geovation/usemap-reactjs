import { FeaturesAPI } from '../api/featuresAPI'
import { useState } from 'react'

const useFeatures = () => {
  const [loading, setLoading] = useState(false)
  const [feature, setFeature] = useState(null)

  const getFeature = (toid) => {
    FeaturesAPI.get_feature(toid).then((response) => {
      setLoading(true)
      return response
    })
      .then((response) => {
        setLoading(false)
        setFeature(response.features[0]) // first feature (only feature)
      })
  }

  return { loading, feature, getFeature }
}

export default useFeatures
