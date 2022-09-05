import React from 'react';
import axios from "axios"
import * as yup from "yup"
import {useFormik} from "formik"
import {useState, forwardRef, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import {Button, FormControl, Link, Radio, Snackbar, TextField, Typography} from "@mui/material";

const Forum = () => {
    const [isSuccess, setIsSuccess] = useState()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const validationSchema = yup.object({
        username: yup.string().min(6, "Username must be at least 6 characters").required("Username is required!"),
        password: yup.string().required("password is required!"),
        passwordAgain: yup.string().required("password is required!").oneOf([yup.ref('password'), null], 'Passwords must match'),
        role: yup.string().required("role is required!")

    })


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordAgain: "",
            role: "user"
        },
        onSubmit: async (values) => {
            const data = values
            const body = {
                "username": data.username,
                "password": data.password,
                "role": data.role
            }

            try {
                await axios.post("http://localhost:5000/user/register", body)
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
    return (<>
        <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{width: "100%", alignItems: "center"}}>
                <TextField
                    id="username"
                    name="username"
                    label="Username *"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    sx={{marginBottom: 3, width: "100%"}}/>

                <TextField
                    id="password"
                    name="password"
                    label="Password *"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{marginBottom: 3, width: "100%"}}/>

                <TextField
                    id="passwordagain"
                    name="passwordAgain"
                    label="Password Again *"
                    type="password"
                    value={formik.values.passwordAgain}
                    onChange={formik.handleChange}
                    error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}
                    helperText={formik.touched.passwordAgain && formik.errors.passwordAgain}
                    sx={{marginBottom: 3, width: "100%"}}/>
                <Typography variant={"h6"}>
                    User
                    <Radio
                        checked={formik.values.role === 'user'}
                        onChange={formik.handleChange}
                        value="user"
                        name="role"
                        inputProps={{'aria-label': 'USER'}}
                    />

                </Typography>

                <Typography variant={"h6"}>
                    Store
                    <Radio
                        checked={formik.values.role === 'store'}
                        onChange={formik.handleChange}
                        value="store"
                        name="role"
                        inputProps={{'aria-label': 'STORE'}}
                    />
                </Typography>


                <Button variant="contained" type="submit"
                        sx={{width: {xs: "100%", md: "50%", marginBottom: 10}}}>Register</Button>

                <Link href="login">Already have an account? Login</Link>

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
                Registration Complete
            </Alert>
        </Snackbar>
        </>

    );
};

export default Forum;