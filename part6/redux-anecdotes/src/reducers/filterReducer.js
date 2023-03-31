import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterUpdate(state, action) {
            const filter = action.payload
            console.log(filter)
            return filter
        }
    }
})

export const { filterUpdate } = filterSlice.actions
export default filterSlice.reducer
