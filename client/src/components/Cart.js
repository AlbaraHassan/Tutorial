import React, { useEffect } from 'react'
import {   useDispatch, useSelector } from 'react-redux'
import { addCart } from '../features/cart'

function Cart() {
    const cart = useSelector((state) => state.cart.value)


    
    
    return (<div>
        {
            
            cart.map((el) => {
                return <div className="center" key={el._id}><div className="text" style={{ padding: "50px" }}>
                    #####################
                    <p>Name: {el.name}</p>
                    <p>Price: {el.price}</p>
                    <p>Quantity: {el.quantity}</p>
                    <p>Category: {el.category_id.name}</p>
                    <p>Subcategory: {el.subcategory_id.name}</p>
                    #####################
                </div>
                </div>
            })
        }
    </div>
    )
}

export default Cart