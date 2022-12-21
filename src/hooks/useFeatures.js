import { useState } from 'react'

import { FeaturesAPI } from '../api/featuresAPI'

const useFeatures = () => {
  const [loadingFeature, setLoadingFeature] = useState(false)
  const [feature, setFeature] = useState(null)

  const getFeatureFromTOID = async toid => {
    setLoadingFeature(true)
    const response = await FeaturesAPI.getFeatureFromTOID(toid)
    const feature = response.features[0]
    setFeature(feature)
    setLoadingFeature(false)
    return feature
  }

  return { loadingFeature, feature, getFeatureFromTOID }
}

export default useFeatures
