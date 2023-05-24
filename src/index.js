import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import App from './App';
import ItemList from './main/ItemList';
import Item from './main/Item';
import Main from './main/Main';
import CartMain from './main/CartMain';
import About from './main/About';
import {Auth0Provider} from '@auth0/auth0-react';
import {CartProvider} from 'react-use-cart';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([{
    path: '/', element: <App/>, children: [
        {index: true, element: <Main/>},
        {
            path: 'items', children: [
                {index: true, element: <ItemList/>},
                {path: ':id', element: <Item/>}
            ]
        },
        {
            path: 'cart', element: <CartMain/>
        },
        {
            path: 'about', element: <About/>
        }
    ]
}]);

root.render(<React.StrictMode>
    <CartProvider>
        <Auth0Provider
            domain='dev-lhgqmxqs3ykfipza.us.auth0.com'
            clientId='WOXt9nupQZD7oteHtE91ENumt8swhIfn'
            authorizationParams={{
                redirect_uri: window.location.origin
            }}>
            <RouterProvider router={router}/>
        </Auth0Provider>
    </CartProvider>
</React.StrictMode>);
