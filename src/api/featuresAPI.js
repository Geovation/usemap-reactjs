import api from './config/axiosConfig'

export const FeaturesAPI = {
  getFeatureFromTOID: async function (toid) {
    const response = await api.request({
      url: `/features/${toid}`,
      method: 'GET'
    })

    return response.data
  }
}
