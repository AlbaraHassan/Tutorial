import React, {memo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {addCart, removeFromCartById} from '../../features/cart'
import Grid from '@mui/material/Grid'
import {Button, Card, CardActions, CardContent, Snackbar, Typography} from '@mui/material'

import {arrayAdd, arrayRemove} from "../../features/array"
import {add, remove} from '../../features/counter'
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

//TODO: Add Functionality for deleting and updating items

const ItemsList = ({items, user, cart}) => {
    const [isOk, setIsOk] = useState()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCart = (obj) => {
        if (cart.includes(obj)) return


        dispatch(addCart(obj))
        dispatch(arrayAdd(obj._id))
        dispatch(add([obj._id, obj.price]))
    }

    const handleRemove = (obj) => {
        dispatch(removeFromCartById(obj))
        dispatch(arrayRemove(obj._id))
        dispatch(remove({"id": obj._id, "price": obj.price}))
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/item/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            setIsOk(true)
            window.location.reload()
        } catch (e) {
            setIsOk(false)
            setError(e.message)
        }

    }

    return (
        <>
            {items.map((el) => {
                return <Grid item xs={3} key={el._id}>
                    <Grid container justifyContent="center" spacing={0}>
                        <Card sx={{minWidth: 275, marginTop: 5, height: 250, backgroundColor: "#d5bdaf"}}>
                            <CardContent>
                                <Typography sx={{fontSize: 30}} color="white" gutterBottom>
                                    {el.name}
                                </Typography>
                                <Typography variant="h5" component="div" color={"#006d77"}>
                                    {el.price} $
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    {el.category_id.name} ---- {el.subcategory_id.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {user.role === "user" ?
                                    (!JSON.stringify(cart).includes(JSON.stringify(el)) ?
                                        <Button size="small" variant="outlined"
                                                sx={{borderColor: "#006d77", color: "#006d77"}}
                                                onClick={() => {
                                                    handleCart(el)
                                                }}>
                                            Add To Cart
                                        </Button> :
                                        <Button size="small" sx={{color: "red", borderColor: "red"}}
                                                variant="outlined"
                                                onClick={() => {
                                                    handleRemove(el)
                                                }}>
                                            Remove From Cart
                                        </Button>)
                                    : <>
                                        <Button size="small" sx={{color: "red", borderColor: "red"}}
                                                variant="outlined" onClick={() => handleDelete(el._id)}>Remove</Button>
                                        <Button size="small" sx={{color: "Green", borderColor: "lightGreen"}}
                                                variant="outlined" onClick={()=>navigate(`/update/${el._id}`)}>Update</Button>
                                    </>
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            })}

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={isOk}
                onClose={() => {
                    setIsOk(null)
                }}
            >
                <Alert onClose={() => {
                    setIsOk(null)
                }} severity="success" sx={{width: '100%'}}>
                    Deleted Successfully
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={isOk === false}
                onClose={() => {
                    setIsOk(null)
                }}
            >
                <Alert onClose={() => {
                    setIsOk(null)
                }} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default memo(ItemsList);