import { createSlice } from "@reduxjs/toolkit"


const arraySlice = createSlice({
    name: "array",
    initialState: { value: [] },
    reducers: {
        arrayAdd: (state, action) => {
            state.value = [ ...state.value, action.payload ]
        },
        arrayRemove: (state, action) => {
            state.value = state.value.filter((i => v => v !== action.payload || --i)(1));
        }
    }
})

export const { arrayAdd, arrayRemove } = arraySlice.actions

export default arraySlice.reducer