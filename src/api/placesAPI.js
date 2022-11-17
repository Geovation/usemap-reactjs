// big thank you to https://semaphoreci.com/blog/api-layer-react

import api from './configs/axiosConfigs'
import { defineCancelApiObject } from './configs/axiosUtils'

export const PlacesAPI = {
  autofill: async function (input, cancel = false) {
    const response = await api.request({
      url: `/places/${input}`,
      method: 'GET',
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.autofill.name].handleRequestCancellation().signal : undefined
    })

    // returning the data from API
    return response.data
  },
  getBuildingFromTOID: async function (input, cancel = false) {
    const response = await api.request({
      url: `/places/toid/${input}`,
      method: 'GET',
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.toidbuilding.name].handleRequestCancellation().signal : undefined
    })
    // returning the data from API
    return response.data
  }
}

// defining the cancel API object for PlacesAPI
const cancelApiObject = defineCancelApiObject(PlacesAPI)
