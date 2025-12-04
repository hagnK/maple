import axios from 'axios'

const api = axios.create({
    baseURL: 'https://back-b4um.onrender.com/api/maples',
})

export const getMapleList = async () => {
    const res = await api.get(``)
    return res.data
}

export const getMapleByJob = async (job) => {
    const res = await api.get(`/search`, {
        params: { job }
    })
    return res.data
}

const nexonApi = axios.create({
    baseURL: 'https://open.api.nexon.com/maplestory/v1',
    headers: {
        'x-nxopen-api-key': 'test_6a707616113667372ef9112d4c4f68cbe1a17a558b57a2a44f9d77ae3c7aef43efe8d04e6d233bd35cf2fabdeb93fb0d'
    }
})

export const getCharacterBasic = async (ocid) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];

    const res = await nexonApi.get('/character/basic', {
        params: {
            ocid,
            date: dateStr
        }
    })
    return res.data
}