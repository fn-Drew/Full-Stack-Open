const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

export const filterUpdate = filter => {
    return {
        type: 'SET_FILTER',
        payload: filter.target.value,
    }
}

export default filterReducer
