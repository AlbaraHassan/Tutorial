import { Routes, Route } from "react-router-dom";
import Redirect from "./components/Redirect";
import MUIRegister from "./components/MUIRegister";
import MUILogin from "./components/MUILogin"
import MUIItems from "./components/MUIItems";
import MUICart from "./components/MUICart";


function App() {



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
