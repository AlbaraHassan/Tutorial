import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
        add: (state, action) => {
            state.value = state.value + 1
        },
        subtract: (state, action) => {
            state.value = state.value - 1
        },
        addByAmount: (store, action) => {
            store.value += action.payload
        }
    }
})

export const { add, subtract, addByAmount } = counterSlice.actions

export default counterSlice.reducer