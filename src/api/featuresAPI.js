// big thank you to https://semaphoreci.com/blog/api-layer-react

import api from './configs/axiosConfigs'
import { defineCancelApiObject } from './configs/axiosUtils'

export const FeaturesAPI = {
  getFeature: async function (input, cancel = false) {
    const response = await api.request({
      url: `/features/${input}`,
      method: 'GET',
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get_feature.name].handleRequestCancellation().signal : undefined
    })

    // returning the first feature from API
    return response.data
  },
  getFeatureNGD: async function (input, cancel = false) {
    const response = await api.request({
      url: `/features/ngd/${input}`,
      method: 'GET',
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get_feature.name].handleRequestCancellation().signal : undefined
    })

    // returning the first feature from API
    return response.data
  }
}

// defining the cancel API object for FeaturesAPI
const cancelApiObject = defineCancelApiObject(FeaturesAPI)
