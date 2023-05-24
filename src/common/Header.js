import './header.css';
import {useAuth0} from "@auth0/auth0-react";
import {useCart} from "react-use-cart";
import {Link, useNavigate} from "react-router-dom";

const publicURL = process.env.PUBLIC_URL;

export default function Header() {
    return <div className={"header"}>
        <Logo/>
        <HeaderInteractive/>
    </div>
}

function Logo() {
    const navigate = useNavigate()
    return <div className={'logo'}
                onClick={() => navigate('/')}>
        <img className={'logo-img icon'} src={publicURL + '/assets/logo.png'}
             alt={'logo'}/>
        <span className={'logo-text'}>Могилянка</span>
    </div>
}

function HeaderInteractive() {
    return <div className={'interactive'}>
        <CartButton/>
        <SingIn/>
    </div>
}

function CartButton() {
    const {isEmpty, totalItems} = useCart()
    return <>
        <img className={'bin-icon icon'}
             src={publicURL + "/assets/bin-icon.png"} alt={'Bin icon'}/>
        {!isEmpty && <span>{totalItems}</span>}
        <Link className={'bin-text'} to={'/cart'}>Кошик</Link>
    </>
}

function SingIn() {
    return <>
        <img className={"sing-in-icon icon"}
             src={publicURL + "/assets/sing-in.png"} alt={"Sing in icon"}/>
        <LoginButton/>
        <LogoutButton/>
    </>
}

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return !isAuthenticated && <button className={"sing-in-button"}
                                       onClick={() =>
                                           loginWithRedirect()}>
        Увійти
    </button>;
};


const LogoutButton = () => {
    const {logout, isAuthenticated, user} = useAuth0()
    const {items, emptyCart} = useCart()
    const saveCart = () => {
        if (user === undefined) return
        let cartJson = {cart: {}}
        for (const item of items) {
            cartJson.cart[`${item.id}`] = item.quantity
        }
        fetch(`http://localhost:3030/users/${user.sub}`, {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(cartJson)
        }).then(() => emptyCart())
    }
    return isAuthenticated && <button
        className={"sing-in-button"}
        onClick={() => {
            saveCart()
            logout({logoutParams: {returnTo: window.location.origin}})
        }}>
        Вийти
    </button>
};
