import axios from "axios"

const baseURL = "http://localhost:3001/tempSensor/data"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(result => result.data)
}

const getPastWeek = () => {
    const request = axios.get(`${baseURL}/past_week`)
    return request.then(result => result.data)
}

export default { getAll, getPastWeek }