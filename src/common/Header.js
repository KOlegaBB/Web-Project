import './header.css';
import {useAuth0} from "@auth0/auth0-react";
import {useCart} from "react-use-cart";
import {useNavigate} from "react-router-dom";

const public_url = process.env.PUBLIC_URL;

export default function Header(props) {
    return <div className={"header"}>
        <Logo/>
        <HeaderInteractive/>
    </div>
}

function Logo(props) {
    const navigate = useNavigate()
    return <div className={'logo'}
                onClick={() => navigate('/')}>
        <img className={'logo-img icon'} src={public_url + '/assets/logo.png'} alt={'logo'}/>
        <span className={'logo-text'}>Могилянка</span>
    </div>
}

function HeaderInteractive(props) {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();
    return <div className={'interactive'}>
        {isAuthenticated && <CartButton onClick={() => navigate('/cart')}/>}
        <SingIn/>
    </div>
}

function CartButton(props) {
    const {isEmpty, totalItems} = useCart()
    return <>
        <img className={'bin-icon icon'} src={public_url + "/assets/bin-icon.png"} alt={'Bin icon'}/>
        {!isEmpty && <span>{totalItems}</span>}
        <span onClick={props.onClick}>Кошик</span>
    </>
}

function SingIn() {
    return <>
        <img className={"sing-in-icon icon"} src={public_url + "/assets/sing-in.png"} alt={"Sing in icon"}/>
        <LoginButton/>
        <LogoutButton/>
    </>
}

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return !isAuthenticated && <button className={"sing-in-button"}
                                       onClick={() => loginWithRedirect()}>
        Увійти
    </button>;
};


const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0()
    return isAuthenticated && <button className={"sing-in-button"}
                                      onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>
        Log out
    </button>
};
