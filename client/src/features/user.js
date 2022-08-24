import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: { value: {} },
    reducers: {
        loginUser: (state, action) => {
            state.value = action.payload

        }
    }
})

export const { loginUser } = userSlice.actions

export default userSlice.reducer