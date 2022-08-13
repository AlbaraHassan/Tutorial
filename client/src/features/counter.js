import { createSlice } from "@reduxjs/toolkit"

const cartCounterSlice = createSlice({
    name: "cartCounter",
    initialState: { value: [] },
    reducers: {
        add: (state,action) => {
            let id = action.payload[0]
            let price = action.payload[1]
            let obj = {"id":id, "price":price}
            for(let i of state.value){
                if(i["id"] == id){
                    i["price"] +=  price 
                    return 
                }
            }
            state.value = [...state.value, obj]
        },
        subtract: (state, action) => {
            let id = action.payload[0]
            let price = action.payload[1]
            let obj = {"id":id, "price":price}
            for(let i of state.value){
                if(i["id"] == id){
                    i["price"] -= price 
                    return

                }
            }
        },
        addByAmount: (store, action) => {
            store.value += action.payload
        }
    }
})

export const { add, subtract, addByAmount } = cartCounterSlice.actions

export default cartCounterSlice.reducer