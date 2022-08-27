import React, {useEffect} from 'react'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import {loginUser} from "../features/user"
import {Container} from "@mui/system"
import {
    Avatar,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"
import NavBar from "../components/NavBar"
import Grid from "@mui/material/Grid"
import {ShoppingCart} from "@mui/icons-material"
import TaskAltIcon from '@mui/icons-material/TaskAlt'

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
        for (let i of arr) {
            sum += i.totalPrice
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
                                    <Typography variant={"h4"}>
                                        <Avatar sx={{
                                            height: 100,
                                            width: 100,
                                            marginBottom: 2,
                                        }}/>
                                        {user ? user.username : ""}
                                    </Typography>


                                    <TableContainer component={Paper} sx={{marginTop: 15}}>
                                        <Table sx={{minWidth: 200}}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">
                                                        <Typography variant={"h5"}>
                                                            Total Number Of Orders
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant={"h5"}>
                                                            Total Amount Payed
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                <TableRow>
                                                    <TableCell align="center">
                                                        <Typography variant={"h4"}>
                                                            {user ? user.cart.length : ""}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant={"h4"}>
                                                            {user ? sum(user.cart) : ""}$
                                                        </Typography>
                                                    </TableCell>

                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Paper>
                            </Grid>

                            <Grid item>
                                <TableContainer component={Paper} sx={{maxHeight: 740}}>
                                    <Table sx={{minWidth: 650}} aria-label="simple table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align={"center"}>
                                                    <Typography variant={"h4"}>
                                                        Items Purchased
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant={"h4"}>
                                                        Total Price
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {user ? user.cart.map((row) => (
                                                <TableRow
                                                    key={row._id}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell align={"center"} scope="row">
                                                        <Typography variant={"h5"}>
                                                            {row.item.length}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant={"h5"}>
                                                            {row.totalPrice}$
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )) : ""}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>


            </Container>
        </>
    )

}


export default MUIProfile