import { createSlice } from "@reduxjs/toolkit"

const arraySlice = createSlice({
    name: "array",
    initialState: { value: [] },
    reducers: {
        arrayAdd: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        arrayRemove:(state)=>{
            state.value.pop()
        }
    }
})

export const { arrayAdd, arrayRemove } = arraySlice.actions

export default arraySlice.reducer