import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, subtract } from '../features/counter'
import { removeFromCart } from "../features/cart"
import { arrayAdd, arrayRemove } from "../features/array"

function Cart() {
    const cart = useSelector((state) => state.cart.value)
    const counter = useSelector((state) => state.counter.value)
    const array = useSelector((state) => state.array.value)
    const [ total, setTotal ] = useState(0)
    const dispatch = useDispatch()

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


    useEffect(() => {
        let sum = 0
        for (let i of counter) {
            sum += i[ "price" ]
        }
        setTotal(sum)

    }, [])




    return (<div>
        {localStorage.getItem("user") ? <p>Logged In As: {`${JSON.parse(localStorage.getItem("user")).username}`}</p> : <p>Not Logged In</p>}
        {

            cart.map((el) => {
                return <div className="center" key={el._id}><div className="text" style={{ padding: "50px" }}>
                    #####################
                    <p>Name: {el.name}</p>
                    <p>Price: {el.price}</p>
                    <p>Category: {el.category_id.name}</p>
                    <p>Subcategory: {el.subcategory_id.name}</p>
                    <p>Quantity: {counter.map((e) => { if (e.id === el._id) return `${e.price / el.price}` })}</p>
                    <button onClick={() => { cartAddHandler([ el._id, el.price ]) }} >Add</button>
                    <button onClick={() => { cartSubtracthandler([ el._id, el.price ], el._id) }}>Subtract</button>
                    <p></p>


                    #####################
                </div>
                </div>
            })

        }
        <p>Total Price: {total}</p>

        <button>CHECKOUT</button>


    </div >
    )
}

export default Cart