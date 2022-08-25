import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: { value: [] },
    reducers: {
        addCart: (state, action) => {
            state.value = [...state.value, action.payload]
            localStorage.setItem("data",JSON.stringify(state.value))

        },
        removeFromCart:(state, action)=>{
            let arr = []
            for(let i of state.value){
                if(i["_id"] !== action.payload) arr.push(i)
            }
            state.value = arr

            localStorage.setItem("data",JSON.stringify(state.value))

        },
        removeFromCartById:(state, action)=>{
            let arr = []
            for(let i of state.value){
                if(i["_id"] !== action.payload["_id"]) arr.push(i)
            }
            state.value = arr
            localStorage.setItem("data",JSON.stringify(state.value))

           
        },
        cartClear:(state)=>{
            state.value = []
        },
        setCart:(state, action)=>{
            state.value = action.payload
        }
    }
})

export const { addCart, removeFromCart, cartClear, removeFromCartById, setCart } = cartSlice.actions

export default cartSlice.reducer