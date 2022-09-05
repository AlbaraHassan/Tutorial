import MuiAlert from "@mui/material/Alert"
import {Button, Typography} from "@mui/material"
import {Container} from "@mui/system"
import {useState, forwardRef, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import Forum from "../components/login/Forum";


const MUILogin = () => {
    const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            navigate("/items")
        }

    }, [])


    return (
        <>
            <Container maxWidth="md" sx={{backgroundColor: "whitesmoke", padding: 10, borderRadius: 10, marginTop: 20}}>
                <Typography variant="h3" color="initial" sx={{marginBottom: 10}} align="center">Login</Typography>
                <Forum/>
            </Container>


        </>
    )

};

export default MUILogin