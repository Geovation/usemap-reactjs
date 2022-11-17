// big thank you to https://semaphoreci.com/blog/api-layer-react

import api from './configs/axiosConfigs'
import { defineCancelApiObject } from './configs/axiosUtils'

export const LinkedIDsAPI = {
  getLinkedIDsFromUPRN: async function (input, cancel = false) {
    const response = await api.request({
      url: `/linkedids/uprn/${input}`,
      method: 'GET',
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.getLinkedIDsFromUPRN.name].handleRequestCancellation().signal : undefined
    })

    // returning the first feature from API
    return response.data
  }
}

// defining the cancel API object for FeaturesAPI
const cancelApiObject = defineCancelApiObject(LinkedIDsAPI)
