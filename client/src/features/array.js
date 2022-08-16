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
        },
        arrayClear: (state)=>{
            state.value = []
        }
    }
})

export const { arrayAdd, arrayRemove, arrayClear } = arraySlice.actions

export default arraySlice.reducer