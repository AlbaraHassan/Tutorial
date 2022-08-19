import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Items from "./components/Items";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Login from "./components/Login";
import Redirect from "./components/Redirect";
import { useEffect } from "react";


function App() {
    
    
    return (
        <Routes>
            <Route path="" element={<Redirect/>}/>
            <Route path="items" element={<Items/>} />
            <Route path="cart" element={<Cart/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
        </Routes>



    );
}

export default App;
