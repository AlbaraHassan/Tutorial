import { createSlice } from "@reduxjs/toolkit"

const category = createSlice({
    name: "category",
    initialState: { value: "" },
    reducers: {
        getCat: (state, action) => {
            state.value = action.payload

        }
    }
})

export const { getCat } = category.actions

export default category.reducer