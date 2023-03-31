import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterUpdate(state, action) {
            const filter = action.payload
            return filter
        }
    }
})

export const { filterUpdate } = filterSlice.actions
export default filterSlice.reducer
