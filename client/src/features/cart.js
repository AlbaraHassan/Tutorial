import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: { value: [] },
    reducers: {
        addCart: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        removeFromCart:(state, action)=>{
            let arr = []
            for(let i of state.value){
                if(i["_id"] !== action.payload) arr.push(i)
            }
            state.value = arr
           
        },
        cartClear:(state)=>{
            state.value = []
        }
    }
})

export const { addCart, removeFromCart, cartClear } = cartSlice.actions

export default cartSlice.reducer