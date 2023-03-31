import { createSlice } from '@reduxjs/toolkit'

const initialState = 'this is a notification'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationUpdate(state, action) {
            const notification = action.payload
            return notification
        }
    }
})

export const { notificationUpdate } = notificationSlice.actions
export default notificationSlice.reducer
