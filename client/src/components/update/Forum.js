import React, {forwardRef, useState} from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Radio,
    Select,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Forum = ({item, categories, subcategories, id}) => {
    const [open, setOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup.string().min(6, "Item name has to contain at least 4 characters").required("Item name is required"),
        category_id: yup.string().required("Category is required"),
        subcategory_id: yup.string().required("Category is required"),
        price: yup.number().required("Price is required")

    })
    const formik = useFormik({
        initialValues: {
            name: item.name,
            category_id: item.category_id._id,
            subcategory_id: item.subcategory_id._id,
            price: item.price
        },
        onSubmit: async (values) => {
            const data = values
            const body = {
                "name": data.name,
                "category_id": data.category_id,
                "subcategory_id": data.subcategory_id,
                "price": data.price
            }
            try {
                await axios.patch(`http://localhost:5000/item/${id}`, body)
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
    return (
        <>
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
                        sx={{marginBottom: 3}}
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
                        sx={{marginBottom: 3}}

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

                    <Button variant="contained" type="submit"
                            sx={{width: {xs: "100%", md: "50%", marginBottom: 10}}}>Update Item</Button>

                </FormControl>
            </form>


            <Snackbar open={open} anchorOrigin={{vertical: "top", horizontal: "center"}}
                      autoHideDuration={6000} onClose={() => {
                setOpen(false)
            }}>
                <Alert onClose={() => {
                    setOpen(false)
                }} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar open={isSuccess} anchorOrigin={{vertical: "top", horizontal: "center"}}
                      autoHideDuration={6000} onClose={() => {
                setIsSuccess(false)
            }}>
                <Alert onClose={() => {
                    setIsSuccess(false)
                }} severity="success" sx={{width: '100%'}}>
                    Updated Successfully
                </Alert>
            </Snackbar>
        </>
    );
};

export default Forum;