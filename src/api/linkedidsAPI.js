import api from './config/axiosConfig'

export const LinkedIDsAPI = {
  getLinkedIDsFromUPRN: async function (input) {
    const response = await api.request({
      url: `/linkedids/uprn/${input}`,
      method: 'GET'
    })

    return response.data
  }
}
