import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {addCart, removeFromCartById} from '../features/cart'
import {getAll} from '../features/items'
import Grid from '@mui/material/Grid'
import {Button, Card, CardActions, CardContent, Pagination, Typography} from '@mui/material'
import {loginUser} from '../features/user'
import NavBar from '../components/NavBar'
import {arrayAdd, arrayRemove} from "../features/array"
import {add, remove} from '../features/counter'
import ItemsList from "../components/items/ItemsList";


const MUIItems = () => {
    const [page, setPage] = useState(1)
    const items = useSelector((state) => state.items.value)
    const cart = useSelector((state) => state.cart.value)
    const user = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const fetchAllItems = async (page) => {
        const res = await axios.get(`http://localhost:5000/item?page=${page}&limit=10`)
        const data = res.data
        dispatch(getAll(data))
    }

    const fetchUser = async () => {
        const res = await axios.post("http://localhost:5000/user/get-me", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        dispatch(loginUser(res.data))
    }
    const handlePagination = async (e, v) => {
        setPage(v)
    }


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
            return
        }

        if (!user) fetchUser() //Fix for sending unneeded requests
        fetchAllItems(page)

    }, [page])


    return (<>

            <NavBar user={user ? user : {}}/>

            <Typography variant="h3" color="text.secondary" align={"center"} margin={5}>
                Store
            </Typography>
            <Grid container spacing={0} columns={{xs: 2, sm: 6, md: 9, lg: 15}}
                  sx={{backgroundColor: "#edf6f9", borderRadius: 10, padding: 5, marginTop: 5, minHeight: 600}}>
                {items ? <>
                    <ItemsList user={user ? user : {}} cart={cart} items={items.data}/>
                </> : []
                }
            </Grid>
            {items ?
                < Pagination sx={{
                    margin: 5, ul: {
                        "& .MuiPaginationItem-root": {
                            color: "red"
                        }
                    }
                }} count={items.totalPages} variant="outlined" size={"large"} page={page}
                             onChange={handlePagination}/> : <></>
            }
        </>
    )
}

export default MUIItems