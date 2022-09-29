import axios from 'axios'

// initializing the axios instance with custom configs
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000' // to replace wihth AWS URL once online
})

export default api
