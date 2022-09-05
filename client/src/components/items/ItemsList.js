import React from 'react'
import {useDispatch} from 'react-redux'
import {addCart, removeFromCartById} from '../../features/cart'
import Grid from '@mui/material/Grid'
import {Button, Card, CardActions, CardContent, Typography} from '@mui/material'

import {arrayAdd, arrayRemove} from "../../features/array"
import {add, remove} from '../../features/counter'


//TODO: Add Functionality for deleting and updating items

const ItemsList = ({items, user, cart}) => {
    const dispatch = useDispatch()

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
                                    (!cart.includes(el) ? <Button size="small" variant="outlined"
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
                                    : <></>}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            })}
        </>
    );
};

export default ItemsList;