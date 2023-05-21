import {useCart} from "react-use-cart";

export default function Cart(props) {
    const {emptyCart, isEmpty} = useCart()
    return <>
        {!isEmpty && <CartContent/>}
        {isEmpty && <span>Cart is empty</span>}
        <button onClick={() => emptyCart()}>Clear</button>
        <button>Order</button>
    </>
}


function CartContent(props) {
    const {items, cartTotal} = useCart()
    return <>
        {items?.map((item) => <CartItem
            key={item.id}
            item={item}
        />)}
        <span>{cartTotal.toFixed(2)}</span>)
    </>
}

function CartItem(props) {
    const {name, quantity, price, id} = props.item
    const {updateItemQuantity, getItem} = useCart()
    return <>
        {name} -
        <button onClick={() => updateItemQuantity(id, getItem(id).quantity - 1)}>-</button>
        {quantity}
        <button onClick={() => updateItemQuantity(id, getItem(id).quantity + 1)}>+
        </button>
        x {price.toFixed(2)}
    </>
}