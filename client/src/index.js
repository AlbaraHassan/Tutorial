import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import counterReducer from "./features/counter"
import arrayReducer from "./features/array"
import itemsReducer from "./features/items"
import cartReducer from "./features/cart"
import { BrowserRouter } from "react-router-dom";
import userReducer from "./features/user"


const store = configureStore({
    reducer: {
        counter: counterReducer,
        array: arrayReducer,
        items: itemsReducer,
        cart: cartReducer,
        user: userReducer,
    },

})

store.subscribe(()=>{
    console.log("State Updated");
    console.log(store.getState());
})





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
