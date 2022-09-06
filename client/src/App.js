import {Routes, Route} from "react-router-dom";
import Redirect from "./components/Redirect";
import MUIRegister from "./pages/MUIRegister";
import MUILogin from "./pages/MUILogin"
import MUIItems from "./pages/MUIItems";
import MUICart from "./pages/MUICart";
import {useDispatch} from "react-redux";
import {setCart} from "./features/cart";
import {setArray} from "./features/array";
import {setCounter} from "./features/counter";
import {useEffect} from "react";
import MUIProfile from "./pages/MUIProfile";
import MUIStore from "./pages/MUIStore";
import MUIUpdate from "./pages/MUIUpdate";


function App() {

    const dispatch = useDispatch()
    const getLocal = async () => {
        if (localStorage.getItem("data")) {
            await dispatch(setCart(JSON.parse(localStorage.getItem("data"))))
        }
        if (localStorage.getItem("array")) {
            await dispatch(setArray(JSON.parse(localStorage.getItem("array"))))
        }
        if (localStorage.getItem("counter")) {
            await dispatch(setCounter(JSON.parse(localStorage.getItem("counter"))))
        }
    }

    useEffect(() => {

        getLocal()

    }, [])


    return (
        <Routes>
            <Route path="" element={<Redirect/>}/>
            <Route path="items" element={<MUIItems/>}/>
            <Route path="cart" element={<MUICart/>}/>
            <Route path="register" element={<MUIRegister/>}/>
            <Route path="login" element={<MUILogin/>}/>
            <Route path="profile" element={<MUIProfile/>}/>
            <Route path="store" element={<MUIStore/>}/>
            <Route path="update/:id" element={<MUIUpdate/>}/>


        </Routes>


    );
}

export default App;
