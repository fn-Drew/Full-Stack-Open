import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request.then(response => response.data)
    return response
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios
        .post(baseUrl, newObject, config)
        .catch((e) => console.log(e))

    return response.data
}

const remove = async blog => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios
        .delete(`${baseUrl}${blog.id}`, config)
        .catch((e) => console.log(e))

    return response.data
}

const put = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios
        .put(`${baseUrl}${newObject.id}`, newObject, config)
        .catch((e) => console.log(e))

    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, put, remove }
