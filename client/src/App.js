import { Routes, Route, Link } from "react-router-dom";
import Counter from "./components/Counter";
import Items from "./components/Items";

function App() {

    return (
        <Routes>
            <Route path="counter" element={<Counter />} />
            <Route path="items" element={<Items/>} />
        </Routes>



    );
}

export default App;
