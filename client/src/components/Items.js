import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from "../features/items"
import "../App.css"
import { getCat } from '../features/categories'
import { getSub } from '../features/subcategory'
function Items() {
    const items = useSelector((state) => state.items.value)
    const category = useSelector((state) => state.category.value)
    const subcategory = useSelector((state) => state.subcategory.value)
    const [ b, setB ] = useState(false)
    const dispatch = useDispatch()



    const fetchCat = async (id) => {
        const res = await axios.get(`http://localhost:5000/category/${id}`)
        const data = res.data
        dispatch(getCat(data.name))
    }

    const fetchSub = async (id) => {
        const res = await axios.get(`http://localhost:5000/subcategory/${id}`)
        console.log(res);

        const data = res.data

        dispatch(getSub(data.name))
    }

    const fetchAllItems = async () => {
        const res = await axios.get("http://localhost:5000/item")
        const data = res.data
        dispatch(getAll(data))
    }

    useEffect(() => {


        fetchAllItems()

    }, [])



    return (
        <>

            {items.map((el) => {
                return <div class="center"><div key={el._id} className="text" style={{ padding: "50px" }}>
                    #####################
                    <p>Name: {el.name}</p>
                    <p>Price: {el.price}</p>
                    <p>Quantity: {el.quantity}</p>
                    <p key={el.category_id}>Category: {el.category_id.name}</p>
                    <p key={el.subcategory_id}>Subcategory: {el.subcategory_id.name}</p>
                    #####################
                </div>
                </div>
            })}


        </>
    )

}

export default Items
