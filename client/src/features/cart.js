import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: { value: [] },
    reducers: {
        addCart: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        removeFromCart:(state, action)=>{
            state.value = state.value.filter((el)=>el === action.payload)
        }
    }
})

export const { addCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer