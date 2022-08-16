import { Routes, Route, Link } from "react-router-dom";
import Counter from "./components/Counter";
import Items from "./components/Items";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {

    return (
        <Routes>
            <Route path="counter" element={<Counter />} />
            <Route path="items" element={<Items/>} />
            <Route path="cart" element={<Cart/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
        </Routes>



    );
}

export default App;
