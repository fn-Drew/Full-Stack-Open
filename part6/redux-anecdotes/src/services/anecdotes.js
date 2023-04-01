import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const genId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const createNew = async (content) => {
    const object = { content, votes: 0, id: genId(), }
    const request = await axios.post(baseUrl, object)
    return request.data
}

const voteFor = async (anecdote) => {
    const request = await axios
        .patch(`${baseUrl}/${anecdote.id}`, {
            ...anecdote,
            votes: anecdote.votes + 1
        })
    return request.data
}

export default {
    getAll,
    createNew,
    voteFor,
}
