import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Cart from "./components/Cart";
import Redirect from "./components/Redirect";
import MUIRegister from "./components/MUIRegister";
import MUILogin from "./components/MUILogin"
import MUIItems from "./components/MUIItems";


function App() {



    return (
        <Routes>
            <Route path="" element={<Redirect />} />
            <Route path="items" element={<MUIItems />} />
            <Route path="cart" element={<Cart />} />
            <Route path="register" element={<MUIRegister />} />
            <Route path="login" element={<MUILogin />} />
        </Routes>



    );
}

export default App;
