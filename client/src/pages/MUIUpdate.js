import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import {loginUser} from "../features/user"
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../components/NavBar";
import {Container} from "@mui/system";
import {Button, FormControl, InputLabel, Link, MenuItem, Radio, Select, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup"
import Forum from "../components/update/Forum";

const MUIUpdate = () => {
    const [curr, setCurr] = useState(null)

    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()


    const fetchUser = async () => {
        const res = await axios.post("http://localhost:5000/user/get-me", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        dispatch(loginUser(res.data))
        if (user && user.role !== "store") navigate("/profile")

    }

    const fetchCat = async () => {
        const res = await axios.get("http://localhost:5000/category", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        setCategories(res.data)
    }

    const fetchSubcat = async () => {
        const res = await axios.get("http://localhost:5000/subcategory", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        setSubcategories(res.data)
    }

    const fetchItem = async (id) => {
        const res = await axios.get(`http://localhost:5000/item/${id}`)
        setCurr(res.data)
    }

    useEffect(() => {
        if (!user) fetchUser()
        fetchCat()
        fetchSubcat()
        fetchItem(id)
    }, [])


    return (<>
        <NavBar user={user ? user : null}/>

            <Container component={"div"} maxWidth="md"
                       sx={{backgroundColor: "whitesmoke", padding: 10, borderRadius: 10, marginTop: 20}}>
                <Typography variant="h3" color="initial" sx={{marginBottom: 10}} align="center">Update Item</Typography>
                {curr?<Forum item={curr} categories={categories} subcategories={subcategories} id={id}/>:<></>}
            </Container>

    </>)


}


export default MUIUpdate