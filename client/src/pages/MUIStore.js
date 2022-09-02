import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import {loginUser} from "../features/user"
import {useNavigate} from "react-router-dom";
import NavBar from "../components/NavBar";
import {Container} from "@mui/system";
import {Button, FormControl, InputLabel, Link, MenuItem, Radio, Select, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup"

const MUIStore = () => {
    const [open, setOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState()
    const [error, setError] = useState("")
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup.string().min(6, "Item name has to contain at least 4 characters").required("Item name is required"),
        category_id: yup.string().required("Category is required"),
        subcategory_id: yup.string().required("Category is required"),
        price: yup.number().required("Price is required")

    })


    const formik = useFormik({
        initialValues: {
            name: "",
            category_id: "",
            subcategory_id: "",
            price: 0
        },
        onSubmit: async (values) => {
            const data = values
            const body = {
                "name": data.name,
                "store_id": user._id,
                "category_id": data.category_id,
                "subcategory_id": data.subcategory_id,
                "price": data.price
            }
            try {
                await axios.post("http://localhost:5000/item", body)
                setIsSuccess(true)
                setTimeout(() => {
                    navigate("/items")
                }, 2000)
            } catch (e) {
                setOpen(true)
                setError(e.response.data.msg);
            }

        },
        validationSchema: validationSchema
    })


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

    useEffect(() => {
        if (!user) fetchUser()
        fetchCat()
        fetchSubcat()
    }, [])


    return (<>
        <NavBar user={user ? user : null}/>

        {/*TODO: Work on this*/}

        <Container component={"div"} maxWidth="md"
                   sx={{backgroundColor: "whitesmoke", padding: 10, borderRadius: 10, marginTop: 20}}>
            <Typography variant="h3" color="initial" sx={{marginBottom: 10}} align="center">Add Item</Typography>
            <form onSubmit={formik.handleSubmit}>
                <FormControl sx={{width: "100%", alignItems: "center"}}>
                    <TextField
                        id="name"
                        name="name"
                        label="Item Name *"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{marginBottom: 3, width: "100%"}}/>


                    <TextField
                        id="category"
                        name="category_id"
                        value={formik.values.category_id}
                        select
                        label="Category *"
                        onChange={formik.handleChange}
                        error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                        helperText={formik.touched.category_id && formik.errors.category_id}
                        fullWidth
                        sx={{marginBottom:3}}

                    >
                        <MenuItem key={""} value={""}>
                            No Selected // Or Empty
                        </MenuItem>
                        {categories.map((el) => (
                            <MenuItem value={el._id} key={el._id}>{el.name}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="subcategory"
                        name="subcategory_id"
                        value={formik.values.subcategory_id}
                        select
                        label="Subcategory *"
                        onChange={formik.handleChange}
                        error={formik.touched.subcategory_id && Boolean(formik.errors.subcategory_id)}
                        helperText={formik.touched.subcategory_id && formik.errors.subcategory_id}
                        fullWidth
                        sx={{marginBottom:3}}
                    >
                        <MenuItem key={""} value={""}>
                            No Selected // Or Empty
                        </MenuItem>
                        {subcategories.map((el) => (
                            <MenuItem value={el._id} key={el._id}>{el.name}</MenuItem>
                        ))}
                    </TextField>


                    <TextField
                        id="price"
                        name="price"
                        label="Item Price *"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        type={"number"}
                        sx={{marginBottom: 3, width: "100%"}}/>

                    {/*<TextField*/}
                    {/*    id="passwordagain"*/}
                    {/*    name="passwordAgain"*/}
                    {/*    label="Password Again *"*/}
                    {/*    type="password"*/}
                    {/*    value={formik.values.passwordAgain}*/}
                    {/*    onChange={formik.handleChange}*/}
                    {/*    error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}*/}
                    {/*    helperText={formik.touched.passwordAgain && formik.errors.passwordAgain}*/}
                    {/*    sx={{marginBottom: 3, width: "100%"}}/>*/}

                    <Button variant="contained" type="submit"
                            sx={{width: {xs: "100%", md: "50%", marginBottom: 10}}}>Add Item</Button>

                </FormControl>
            </form>
        </Container>


    </>)


}


export default MUIStore