import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, subtract, counterClear } from '../features/counter'
import { removeFromCart, cartClear } from "../features/cart"
import { arrayAdd, arrayRemove, arrayClear } from "../features/array"
import { useNavigate } from "react-router-dom";

import axios from "axios"

function Cart() {
    const cart = useSelector((state) => state.cart.value)
    const counter = useSelector((state) => state.counter.value)
    const array = useSelector((state) => state.array.value)
    const [ total, setTotal ] = useState(0)
    const [ isOk, setIsOk ] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartAddHandler = (arr) => {
        dispatch(arrayAdd(arr[ 0 ]))

        dispatch(add(arr))
        let sum = arr[ 1 ]
        for (let i of counter) {
            sum += i[ "price" ]
        }
        setTotal(sum)

    }

    const cartSubtracthandler = (arr, rem) => {
        if (counter.length === 0) {
            dispatch(removeFromCart(rem))
            console.log(rem);
            setTotal(0)
            return
        }
        dispatch(arrayRemove(arr[ 0 ]))

        dispatch(subtract(arr))

        for (let i of counter) {

            if (i[ "id" ] === arr[ 0 ] && i[ "price" ] === 0) {
                dispatch(removeFromCart(rem))
            }
            else if (i[ "id" ] === arr[ 0 ]) setTotal(total - arr[ 1 ])

        }

        console.log(counter);
    }

    const handleCheckout = async () => {
        const items = array
        const totalPrice = total

        const id = JSON.parse(localStorage.getItem("user"))[ "id" ]


        const cartRes = await axios.post("http://localhost:5000/cart", {
            "item": items,
            "totalPrice": totalPrice
        })

        const userRes = await axios.post(`http://localhost:5000/user/update/${id}`, {

            "cart": cartRes.data._id
        }, {
            withCredentials: true
        })

        if (userRes.data[ "msg" ]) {
            setIsOk(false)
            return
        }

        setIsOk(true)

        dispatch(counterClear())
        dispatch(arrayClear())
        dispatch(cartClear())





        setTimeout(() => {
            navigate("/items")
        }, 3000);





    }


    useEffect(() => {
        let sum = 0
        for (let i of counter) {
            sum += i[ "price" ]
        }
        setTotal(sum)

    }, [])




    return (<div>
        {localStorage.getItem("user") ? <p>Logged In As: {`${JSON.parse(localStorage.getItem("user")).username}`}</p> : <p>Not Logged In</p>}

        <div className='w3-display-topmiddle'>
            {
                cart.map((el) => {
                    return <div className="w3-panel w3-card-4 w3-center w3-animate-top w3-padding-64" key={el._id}><div className="text" style={{ padding: "50px" }}>
                        #####################
                        <p>Name: {el.name}</p>
                        <p>Price: {el.price}</p>
                        <p>Category: {el.category_id.name}</p>
                        <p>Subcategory: {el.subcategory_id.name}</p>
                        <p>Quantity: {counter.map((e) => { if (e.id === el._id) return `${e.price / el.price}` })}</p>
                        <button className="w3-button w3-round-xxlarge w3-blue w3-hover-aqua" onClick={() => { cartAddHandler([ el._id, el.price ]) }} >Add</button>
                        <button className='w3-button w3-round-xxlarge w3-red w3-hover-aqua' onClick={() => { cartSubtracthandler([ el._id, el.price ], el._id) }}>Subtract</button>
                        <p></p>


                        #####################
                    </div>
                    </div>
                })

            }
        </div>

        <p >Total Price: {total}</p>

        <button className="w3-button w3-round-xxlarge w3-blue w3-hover-aqua" onClick={handleCheckout}>CHECKOUT</button>
        {isOk ? <p>Purchase Completed</p> : <></>}
        {isOk === false ? <p>Error During Purchase</p> : <></>}



    </div >
    )
}

export default Cart