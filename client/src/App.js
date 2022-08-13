import { Routes, Route, Link } from "react-router-dom";
import Counter from "./components/Counter";
import Items from "./components/Items";
import Cart from "./components/Cart";

function App() {

    return (
        <Routes>
            <Route path="counter" element={<Counter />} />
            <Route path="items" element={<Items/>} />
            <Route path="cart" element={<Cart/>}/>
        </Routes>



    );
}

export default App;
