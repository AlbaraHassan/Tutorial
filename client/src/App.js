import { Routes, Route } from "react-router-dom";
import Redirect from "./components/Redirect";
import MUIRegister from "./components/MUIRegister";
import MUILogin from "./components/MUILogin"
import MUIItems from "./components/MUIItems";
import MUICart from "./components/MUICart";
import { useDispatch } from "react-redux";
import { setCart } from "./features/cart";
import { setArray } from "./features/array";
import { setCounter } from "./features/counter";
import { useEffect, useState } from "react";


function App() {

    const dispatch = useDispatch()
    
    const getLocal = () => {
        if (localStorage.getItem("data")) {
            dispatch(setCart(JSON.parse(localStorage.getItem("data"))))
        }
        // if (localStorage.getItem("array")) {
        //     dispatch(setArray(JSON.parse(localStorage.getItem("array"))))
        // }
        if (localStorage.getItem("counter")) {
            dispatch(setCounter(JSON.parse(localStorage.getItem("counter"))))
        }
    }

    useEffect(() => {
      
    getLocal()
     
    }, [])
    


    return (
        <Routes>
            <Route path="" element={<Redirect />} />
            <Route path="items" element={<MUIItems />} />
            <Route path="cart" element={<MUICart />} />
            <Route path="register" element={<MUIRegister />} />
            <Route path="login" element={<MUILogin />} />
        </Routes>



    );
}

export default App;
