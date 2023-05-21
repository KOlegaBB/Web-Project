import {useParams} from "react-router";
import {useCart} from "react-use-cart";
import {useAuth0} from "@auth0/auth0-react";

const public_url = process.env.PUBLIC_URL

export default function Item() {
    const {id} = useParams()
    const {isAuthenticated} = useAuth0()
    const {addItem, inCart, updateItemQuantity, getItem} = useCart()
    let item = {}
    fetch(`http://localhost:3030/items/${id}`)
        .then((result) => result.json())
        .then((result) => item = result)
    const add_to_cart = () => {
        if (!inCart(id)) {
            addItem(item);
        } else {
            updateItemQuantity(id, getItem(id).quantity + 1)
        }
    }
    return <>
        <h1 className={""}>Item: {id}</h1>
        <h2>{item.name}</h2>
        <img src={public_url + item.src} alt={'tomb'}/>
        {isAuthenticated && <button onClick={add_to_cart}>Add to cart</button>}
    </>
}