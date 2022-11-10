import axios, { type AxiosRequestConfig } from 'axios'
const HTTP = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
})

const onRequestSuccess = (config: AxiosRequestConfig) => {
    const token = JSON.parse(`${localStorage.getItem('token')}`)
    if (token) {
        if (!config.headers) {
            config.headers = {}
        }
        config.headers.Authorization = `Bearer ${token}`
    }
    config.timeout = 1000000
    return config
}

HTTP.interceptors.request.use(onRequestSuccess)

export default HTTP