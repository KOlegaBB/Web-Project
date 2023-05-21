import Header from "./common/Header";
import Footer from "./common/Footer";
import {Outlet} from "react-router";
import {Auth0Provider} from "@auth0/auth0-react";
import NavToolbar from "./common/NavToolbar";
import {CartProvider} from "react-use-cart";

export default function App(props) {
    return <CartProvider>
        <Auth0Provider
            domain="dev-lhgqmxqs3ykfipza.us.auth0.com"
            clientId="WOXt9nupQZD7oteHtE91ENumt8swhIfn"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}>
            <Header/>
            <NavToolbar values={[
                {name: "Пропозиції", url: "/items"},
                {name: "Акції", url: "/"},
                {name: "Про нас", url: "/about"}
            ]}/>
            <Outlet/>
            <Footer/>
        </Auth0Provider>
    </CartProvider>;
}
