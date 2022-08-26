import { useFormik } from "formik"
import * as yup from "yup"
import { FormControl, Snackbar, TextField, Link } from "@mui/material"
import MuiAlert from "@mui/material/Alert"
import { Button, Typography } from "@mui/material"
import { Container } from "@mui/system"
import axios from "axios"
import { useState, forwardRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MUIRegister = () => {

    const [ isSuccess, setIsSuccess ] = useState()
    const [ open, setOpen ] = useState(false)
    const [ error, setError ] = useState("")

    const navigate = useNavigate()


    const validationSchema = yup.object({
        username: yup.string().min(6, "Username must be at least 6 characters").required("Username is required!"),
        password: yup.string().required("password is required!"),
        passwordAgain: yup.string().required("password is required!").oneOf([ yup.ref('password'), null ], 'Passwords must match')
    })


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordAgain: ""
        },
        onSubmit: async (values) => {
            const data = values
            const body = {
                "username": data.username,
                "password": data.password
            }
            try {
                await axios.post("http://localhost:5000/user/register", body)
                setIsSuccess(true)
                setTimeout(()=>{
                    navigate("/items")
                }, 2000)
            } catch (e) {
                setOpen(true)
                setError(e.response.data.msg);
            }

        },
        validationSchema: validationSchema
    })


    useEffect(() => {

        if (localStorage.getItem("accessToken")) {
            navigate("/items")
        }

    }, [])


    return (
        <>
            <Container component={"div"} maxWidth="md" sx={{ backgroundColor: "whitesmoke", padding: 10, borderRadius: 10, marginTop: 20 }}>
                <Typography variant="h3" color="initial" sx={{ marginBottom: 10 }} align="center">Register</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl sx={{ width: "100%", alignItems: "center" }} >
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

                        <TextField
                            id="passwordagain"
                            name="passwordAgain"
                            label="Password Again *"
                            type="password"
                            value={formik.values.passwordAgain}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}
                            helperText={formik.touched.passwordAgain && formik.errors.passwordAgain}
                            sx={{ marginBottom: 3, width: "100%" }} />
                        <Button variant="contained" type="submit" sx={{ width: { xs: "100%", md: "50%",marginBottom:10 } }}>Register</Button>

                        <Link href="login">Already have an account? Login</Link>

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
                    Registeration Complete
                </Alert>
            </Snackbar>



        </>
    )

};

export default MUIRegister