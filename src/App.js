import Header from './common/Header'
import Footer from './common/Footer'
import {Outlet} from 'react-router'
import NavToolbar from './common/NavToolbar'
import {useAuth0} from '@auth0/auth0-react'
import {useCart} from 'react-use-cart'
import {useEffect} from 'react'

export default function App() {
    const {user} = useAuth0()
    const {setItems} = useCart()
    useEffect(() => {
        if (user === undefined) return
        loadCart(user.sub, setItems)
    }, [user])
    return <>
        <Header/>
        <NavToolbar values={[{text: 'Пропозиції', url: '/items'}, {
            text: 'Акції', url: '/items', linkParams: {tags: ['Акції']}
        }, {text: 'Про нас', url: '/about'}]}/>
        <Outlet/>
        <Footer/>
    </>
}

function loadCart(userSub, setItems) {
    const loadCart = (userId) => {
        fetch(`http://localhost:3030/users/${userId}`)
            .then(response => response.json())
            .then(json => {
                const cart = json.cart
                const items = Object.keys(cart)
                if (items.length === 0) return
                let newRequest = `http://localhost:3030/items?`
                items.map(key => newRequest = newRequest + `id=${key}&`)
                fetch(newRequest)
                    .then(response => response.json())
                    .then(jsonResponse => {
                        for (let i = 0; i < jsonResponse.length; i++) {
                            jsonResponse[i] = {
                                ...jsonResponse[i],
                                quantity: Number(cart[`${jsonResponse[i].id}`])
                            }
                        }
                        setItems(jsonResponse)
                    })
            })
    }

    fetch(`http://localhost:3030/users?id=${userSub}`)
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.length === 0) {
                fetch(`http://localhost:3030/users/`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: userSub, 'cart': {}})
                }).then(() => console.log(`New user ${userSub} login`))
            } else {
                loadCart(jsonResponse[0].id)
            }
        })
}
