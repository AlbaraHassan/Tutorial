import React from 'react'
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { add, subtract, addByAmount } from "../features/counter"
import { arrayAdd, arrayRemove } from "../features/array"
import { Routes, Route, Link } from "react-router-dom";

function Counter() {
    const [ error, setError ] = useState(false)
    const count = Number(useSelector((state) => state.counter.value))
    const [ input, setInput ] = useState()

    const counterArray = useSelector((state) => state.array.value)
    const dispatch = useDispatch()

    const decreaseValue = () => {
        dispatch(subtract())
        dispatch(arrayRemove())
    }

    const increaseValue = () => {
        dispatch(add())
        dispatch(arrayAdd(count + 1))
    }

    const onChangeValue = () => {
        dispatch(addByAmount(input))
        dispatch(arrayAdd(count + Number(input)))
    }

    return (
        <div>



            <div style={{ display: "flex" }}>
                <button onClick={decreaseValue}>-</button>
                <p style={{ height: "20px", margin: 0 }}>{count}</p>
                <button onClick={increaseValue}>+</button>
            </div>

            {error && (<div style={{ background: "red" }}>Cannot decrease more!</div>)}



            <div>
                <input value={input} onChange={(e) => { setInput(Number(e.target.value)) }}></input>
                <button onClick={onChangeValue}>Add Amount</button>
            </div>

            {counterArray.map((el) => <div>{el}</div>)}


        </div>
    )
}

export default Counter