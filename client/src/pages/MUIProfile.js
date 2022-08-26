import React, {useEffect} from 'react'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../features/user";
import {Container} from "@mui/system";
import {Avatar, Paper, Typography} from "@mui/material";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid";
import {ShoppingCart} from "@mui/icons-material";


const MUIProfile = () => {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const fetchUser = async () => {
        const res = await axios.post("http://localhost:5000/user/get-me", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        dispatch(loginUser(res.data))
    }

    const sum = (arr) => {
        let sum = 0
        for(let i of arr){
            sum+=i.totalPrice
        }
        return sum
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <NavBar user={user}/>
            <Container component={"div"} maxWidth="large" sx={{
                backgroundColor: "whitesmoke",
                borderRadius: 10,
                padding: 5,
                marginTop: 5,
                minHeight: 600
            }}>


                <Grid sx={{flexGrow: 1}} container spacing={5}>
                    <Grid item xs={15}>
                        <Grid container justifyContent="center" spacing={5}>
                            <Grid item>
                                <Paper
                                    sx={{
                                        height: 500,
                                        width: 600,
                                        padding: 10,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                >
                                    <Grid container spacing={30}>
                                        <Grid item xs={0.0000001}>
                                            <Typography variant={"h4"}>
                                                <Avatar sx={{
                                                    height: 100,
                                                    width: 100,
                                                    marginBottom: 2,
                                                }}/>
                                                {user ? user.username : ""}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography variant={"h5"}>
                                                <ShoppingCart sx={{fontSize: 80}}/>
                                                {user ? user.cart.length : ""} Purchases
                                            </Typography>
                                        </Grid>


                                        <Grid item xs={1}>
                                            <Typography variant={"h5"}>
                                                <ShoppingCart sx={{fontSize: 80}}/>
                                                {user ? sum(user.cart) : ""}$
                                            </Typography>
                                        </Grid>


                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid item>
                                <Paper
                                    sx={{
                                        height: 500,
                                        width: 1000,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>


            </Container>
        </>
    )

};


export default MUIProfile