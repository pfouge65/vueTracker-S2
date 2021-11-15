import axios from "axios";

const JSON_BIN_SECRET = import.meta.env.VITE_JSON_BIN_SECRET

const instance = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/6192d4020ddbee6f8b0bff1a',
    headers: {'X-Master-Key': JSON_BIN_SECRET}
})

export async function getAll () {
    const res = await instance.get('/latest')
    return res.data.record
}

export async function updateAll (newTasks) {
    await instance.put('/', newTasks)
}