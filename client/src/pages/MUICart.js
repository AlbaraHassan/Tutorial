import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {loginUser} from '../features/user'
import NavBar from '../components/NavBar'
import {add, subtract, counterClear} from '../features/counter'
import {removeFromCart, cartClear} from "../features/cart"
import {arrayAdd, arrayRemove, arrayClear} from "../features/array"
import {
    Button, ButtonGroup,
    Paper,
    Snackbar, Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import {Stack, styled} from "@mui/system"
import CartList from "../components/cart/CartList";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Item = styled(Paper)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}))


const MUICart = () => {

    const [total, setTotal] = useState(0)
    const [isOk, setIsOk] = useState()
    const [error, setError] = useState("")
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
        dispatch(arrayAdd(arr[0]))

        dispatch(add(arr))
        let sum = arr[1]
        for (let i of counter) {
            sum += i["price"]
        }
        setTotal(sum)

    }

    const cartSubtractHandler = (arr, rem) => {
        if (counter.length === 0) {
            dispatch(removeFromCart(rem))
            console.log(rem)
            setTotal(0)
            return
        }
        dispatch(arrayRemove(arr[0]))
        setTotal(total-arr[1])
        dispatch(subtract(arr))

        for (let i of counter) {

            if (i["id"] === arr[0] && i["price"] === arr[1]) {
                dispatch(removeFromCart(rem))
            } else if (i["id"] === arr[0]) setTotal(total - arr[1])

        }

    }

    const handleCheckout = async () => {
        if (counter.length === 0 || total === 0) {
            setError("Invalid Amount")
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

        if (userRes.data["msg"]) {
            setIsOk(false)
            setError(userRes.data["msg"])
            return
        }

        setIsOk(true)

        dispatch(counterClear())
        dispatch(arrayClear())
        dispatch(cartClear())
        localStorage.removeItem("data")
        localStorage.removeItem("counter")

        setTimeout(() => {
            navigate("/items")
        }, 3000)

    }

    const localData = async () => {

        let sum = 0
        for (let i of JSON.parse(localStorage.getItem("counter"))) {
            sum += i.price
        }
        setTotal(sum)
    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
            return
        }
        if (!user) fetchUser()
        localData()


    }, [])


    return (<>
            <NavBar user={user}/>


            <Typography variant="h3" color="text.secondary" align={"center"} margin={5}>Cart</Typography>
            {cart.length === 0 ? <Typography variant="h4" color="text.secondary">Cart is empty</Typography> : <></>}
            {cart.length !== 0 ? <>
                <CartList cartAddHandler={cartAddHandler} cart={cart} cartSubtractHandler={cartSubtractHandler}
                          counter={counter}/>
                <Typography variant="h4" color="initial" marginTop={5} align={"center"}>Total Price: {total} $ <Button
                    size="large" onClick={handleCheckout} variant="contained">Purchase</Button></Typography>

            </> : <></>}


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
                    Purchase Successful
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
    )
}

export default MUICart