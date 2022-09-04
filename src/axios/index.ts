import axios from 'axios'
import {LocalStorageKey} from "../store/slices/authSlice"


export const instance =  axios.create({
  baseURL: 'http://docker.digital-spectr.ru:8888/api',
})



instance.interceptors.response.use(config => config, async (error) => {
  if (error.response.status === 401) {

    const response = await instance.post('auth/refresh', {
      refresh: localStorage.getItem(LocalStorageKey.REFRESH)
    })

    console.log(response)
    if (response.status === 200){
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`

      return axios(error.config)
    }

  }

  return error
})