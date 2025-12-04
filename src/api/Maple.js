import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/maples',
})

export const getMapleList = async () => {
    const res = await api.get(``)
    return res.data
}

export const getMapleById = async (id) => {
    const res = await api.get(`/${id}`)
    return res.data
}

export const getMapleByJob = async (job) => {
    const res = await api.get(`/search`, {
        params: { job }
    })
    return res.data
}