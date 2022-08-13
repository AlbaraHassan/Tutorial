import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
    name: "items",
    initialState: { value: [] },
    reducers: {
        getAll: (state, action) => {
            state.value = action.payload

        }
    }
})

export const { getAll } = itemsSlice.actions

export default itemsSlice.reducer