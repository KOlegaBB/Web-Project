import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";
import App from './App';
import ItemList from "./main/ItemList";
import Item from "./main/Item";
import Main from "./main/Main";
import Cart from "./main/Cart";
import About from "./main/About";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
    path: "/", element: <App/>, children: [
        {index: true, element: <Main/>},
        {
            path: "items", children: [
                {index: true, element: <ItemList/>},
                {path: ":id", element: <Item/>}
            ]
        },
        {
            path: "cart", element: <Cart/>
        },
        {
            path: "about", element: <About/>
        }
    ]
}]);

root.render(<React.StrictMode>
    <RouterProvider router={router}/>
</React.StrictMode>);
