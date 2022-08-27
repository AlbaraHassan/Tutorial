import { createSlice } from "@reduxjs/toolkit"

const cartCounterSlice = createSlice({
    name: "cartCounter",
    initialState: { value: [] },
    reducers: {
        add: (state, action) => {
            let id = action.payload[ 0 ]
            let price = action.payload[ 1 ]
            let obj = { "id": id, "price": price }
            for (let i of state.value) {
                if (i[ "id" ] === id) {
                    i[ "price" ] += price
                    localStorage.setItem("counter", JSON.stringify(state.value))
                    return
                }
            }
            state.value = [ ...state.value, obj ]
            localStorage.setItem("counter", JSON.stringify(state.value))
        },
        subtract: (state, action) => {
            let id = action.payload[ 0 ]
            let price = action.payload[ 1 ]
            for (let i of state.value) {
                if (i[ "id" ] === id) {
                    if (i[ "price" ] === price) {
                        state.value = state.value.filter((el) => el[ "price" ] !== price)
                        localStorage.setItem("counter", JSON.stringify(state.value))
                        return
                    }
                    i[ "price" ] -= price
                    return

                }
            }


        },
        counterClear: (state) => {
            state.value = []
            localStorage.setItem("counter", JSON.stringify(state.value))

        },
        setCounter: (state, action) => {
            state.value = action.payload
        },
        remove: (state, action) => {
            state.value = state.value.filter((el) => JSON.stringify(el) !== JSON.stringify(action.payload))
            localStorage.setItem("counter", JSON.stringify(state.value))

        }
    }
})

export const { add, subtract, counterClear, setCounter, remove } = cartCounterSlice.actions

export default cartCounterSlice.reducer