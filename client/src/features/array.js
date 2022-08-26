import { createSlice } from "@reduxjs/toolkit"


const arraySlice = createSlice({
    name: "array",
    initialState: { value: [] },
    reducers: {
        arrayAdd: (state, action) => {
            state.value = [ ...state.value, action.payload ]
            // localStorage.setItem("array", JSON.stringify(state.value))
        },
        arrayRemove: (state, action) => {
            state.value = state.value.filter((i => v => v !== action.payload || --i)(1));
            // localStorage.setItem("array", JSON.stringify(state.value))

        },
        arrayClear: (state) => {
            state.value = []
            // localStorage.setItem("array", JSON.stringify(state.value))
        },
        setArray: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { arrayAdd, arrayRemove, arrayClear, setArray } = arraySlice.actions

export default arraySlice.reducer