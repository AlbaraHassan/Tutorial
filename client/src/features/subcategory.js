import { createSlice } from "@reduxjs/toolkit"

const subcategory = createSlice({
    name: "subcategory",
    initialState: { value: "" },
    reducers: {
        getSub: (state, action) => {
            state.value = action.payload
            

        }
    }
})

export const { getSub } = subcategory.actions

export default subcategory.reducer