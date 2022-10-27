import axios from 'axios'
const HTTP = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default HTTP