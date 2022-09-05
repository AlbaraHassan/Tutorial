import Forum from "../components/register/Forum"
import {Button, Typography} from "@mui/material"
import {Container} from "@mui/system"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react";




const MUIRegister = () => {
    const navigate = useNavigate()
    useEffect(() => {

        if (localStorage.getItem("accessToken")) {
            navigate("/items")
        }

    }, [])


    return (
        <>
            <Container component={"div"} maxWidth="md"
                       sx={{backgroundColor: "whitesmoke", padding: 10, borderRadius: 10, marginTop: 20}}>
                <Typography variant="h3" color="initial" sx={{marginBottom: 10}} align="center">Register</Typography>
                <Forum />
            </Container>
        </>
    )

};

export default MUIRegister