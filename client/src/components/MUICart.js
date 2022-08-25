import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../features/user'
import NavBar from './NavBar'
import { add, subtract, counterClear, setCounter } from '../features/counter'
import { removeFromCart, cartClear, setCart } from "../features/cart"
import { arrayAdd, arrayRemove, arrayClear, setArray } from "../features/array"
import { Button, Card, CardActions, CardContent, Grid, Snackbar, Typography } from '@mui/material'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function MUICart() {

    const [ total, setTotal ] = useState(0)
    const [ isOk, setIsOk ] = useState()
    const [ error, setError ] = useState("")
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.value)
    const cart = useSelector((state) => state.cart.value)
    const counter = useSelector((state) => state.counter.value)
    const array = useSelector((state) => state.array.value)
    const dispatch = useDispatch()

    const fetchUser = async () => {
        const res = await axios.post("http://localhost:5000/user/get-me", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        dispatch(loginUser(res.data))
    }

    const cartAddHandler = (arr) => {
        dispatch(arrayAdd(arr[ 0 ]))

        dispatch(add(arr))
        let sum = arr[ 1 ]
        for (let i of counter) {
            sum += i[ "price" ]
        }
        setTotal(sum)

    }

    const cartSubtracthandler = (arr, rem) => {
        if (counter.length === 0) {
            dispatch(removeFromCart(rem))
            console.log(rem);
            setTotal(0)
            return
        }
        dispatch(arrayRemove(arr[ 0 ]))

        dispatch(subtract(arr))

        for (let i of counter) {

            if (i[ "id" ] === arr[ 0 ] && i[ "price" ] === 0) {
                dispatch(removeFromCart(rem))
            }
            else if (i[ "id" ] === arr[ 0 ]) setTotal(total - arr[ 1 ])

        }

    }

    const handleCheckout = async () => {
        if (counter.length === 0) {
            setError("You did not specify the quantity")
            setIsOk(false)
            return
        }


        const items = array
        const totalPrice = total

        const id = user._id


        const cartRes = await axios.post("http://localhost:5000/cart", {
            "item": items,
            "totalPrice": totalPrice
        })

        const userRes = await axios.post(`http://localhost:5000/user/update/${id}`, {

            "cart": cartRes.data._id
        }, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        if (userRes.data[ "msg" ]) {
            setIsOk(false)
            setError(userRes.data[ "msg" ])
            return
        }

        setIsOk(true)

        dispatch(counterClear())
        dispatch(arrayClear())
        dispatch(cartClear())
        setTimeout(() => {
            navigate("/items")
        }, 3000);

    }

    const localData = async () => {
        if (localStorage.getItem("data")) {
            dispatch(setCart(JSON.parse(localStorage.getItem("data"))))
        }
        if (localStorage.getItem("array")) {
            dispatch(setArray(JSON.parse(localStorage.getItem("array"))))
        }
        if (localStorage.getItem("counter")) {
            dispatch(setCounter(JSON.parse(localStorage.getItem("counter"))))
        }
        let sum = 0
        for(let i of JSON.parse(localStorage.getItem("counter"))){
            sum+=i.price
        }
        setTotal(sum)
    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
            return
        }
        if (JSON.stringify(user) === JSON.stringify({})) fetchUser()
        localData()


    }, [])


    return (<>
        <NavBar user={user} />
        <Typography variant="h3" color="text.secondary" align={"center"} margin={5}>Cart</Typography>
        {cart.length === 0 ? <Typography variant="h4" color="text.secondary">Cart is empty</Typography> : <></>}
        {cart.length !== 0 ? <><Grid container spacing={0} columns={{ xs: 2, sm: 6, md: 9, lg: 15 }} sx={{ backgroundColor: "whitesmoke", borderRadius: 10, padding: 5, marginTop: 5, minHeight: 600 }}>
            {cart.map((el) => {
                return <Grid item xs={3} key={el._id}>
                    <Grid container justifyContent="center" spacing={0}>
                        <Card sx={{ minWidth: 275, marginTop: 5, height: 230, backgroundColor: "#f0f8ff" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                                    {el.name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {el.price} $
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {el.category_id.name} ----  {el.subcategory_id.name}
                                </Typography>

                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    In Cart: {counter.map((e) => { if (e.id === el._id) return `${e.price / el.price}` })}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="outlined" onClick={() => { cartAddHandler([ el._id, el.price ]) }}>Add</Button>



                                <Button size="small" sx={{ color: "red", borderColor: "red" }} variant="outlined" onClick={() => { cartSubtracthandler([ el._id, el.price ], el._id) }}>Subtract</Button>

                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            })}


        </Grid>

            <Typography variant="h4" color="initial" marginTop={5} align={"center"}>Total Price: {total} $  <Button size="large" onClick={handleCheckout} variant="contained">Purchase</Button></Typography>

        </> : <></>}


        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isOk}
            onClose={() => { setIsOk(null) }}
        >
            <Alert onClose={() => { setIsOk(null) }} severity="success" sx={{ width: '100%' }}>
                Purchase Successful
            </Alert>
        </Snackbar>

        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isOk === false}
            onClose={() => { setIsOk(null) }}
        >
            <Alert onClose={() => { setIsOk(null) }} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>

    </>
    )
}

export default MUICart