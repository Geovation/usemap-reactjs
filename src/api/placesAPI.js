import api from './config/axiosConfig'

export const PlacesAPI = {
  getPlacesFromSearch: async function (search) {
    const response = await api.request({
      url: `/places/${search}`,
      method: 'GET'
    })
    return response.data
  },
  getPlaceFromTOID: async function (toid) {
    const response = await api.request({
      url: `/places/toid/${toid}`,
      method: 'GET'
    })
    return response.data
  }
}
