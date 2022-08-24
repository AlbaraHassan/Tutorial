import { useFormik } from "formik"
import * as yup from "yup"
import { FormControl, Snackbar, TextField, Link } from "@mui/material"
import MuiAlert from "@mui/material/Alert"
import { Button, Typography } from "@mui/material"
import { Container } from "@mui/system"
import axios from "axios"
import { useState, forwardRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../features/user"

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MUILogin() {

    const [ isSuccess, setIsSuccess ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const [ error, setError ] = useState("")

    const navigate = useNavigate()

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()


    const validationSchema = yup.object({
        username: yup.string().min(6, "Username is at least 6 characters").required("Username is required!"),
        password: yup.string().required("password is required!")
    })


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            const data = values
            const body = {
                "username": data.username,
                "password": data.password
            }
            try {
                const res = await axios.post("http://localhost:5000/user/login", body)
                localStorage.setItem("accessToken", res.data.accessToken)
                const getMe = await axios.post("http://localhost:5000/user/get-me",{},{
                    "headers":{
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                dispatch(loginUser(getMe.data))
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
            <Container maxWidth="md" sx={{ backgroundColor: "whitesmoke", padding: 10, borderRadius: 10, marginTop: 20 }}>
                <Typography variant="h3" color="initial" sx={{ marginBottom: 10 }} align="center">Login</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl sx={{ width: "100%", alignItems: "center" }} justifyContent="center"  >
                        <TextField
                            id="username"
                            name="username"
                            label="Username *"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            sx={{ marginBottom: 3, width: "100%" }} />

                        <TextField
                            id="password"
                            name="password"
                            label="Password *"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ marginBottom: 3, width: "100%" }} />


                        <Button variant="contained" type="submit" sx={{ width: { xs: "100%", md: "50%", marginBottom: 10 } }}>Register</Button>

                        <Link href="register">Don't Have an account? Register</Link>

                    </FormControl>
                </form>
            </Container>

            <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000} onClose={() => { setOpen(false) }}>
                <Alert onClose={() => { setOpen(false) }} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar open={isSuccess} anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000} onClose={() => { setIsSuccess(false) }}>
                <Alert onClose={() => { setIsSuccess(false) }} severity="success" sx={{ width: '100%' }}>
                    {`Welcome ${user.username}`}
                </Alert>
            </Snackbar>



        </>
    )

}

export default MUILogin