import { createSlice } from "@reduxjs/toolkit"

const category = createSlice({
    name: "catsub",
    initialState: { value: {"":[]} },
    reducers: {
        getCS: (state, action) => {
            state.value = action.payload

        }
    }
})

export const { getCS } = category.actions

export default category.reducer