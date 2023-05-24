import {useCart} from 'react-use-cart';
import {isValidPhoneNumber} from 'react-phone-number-input'
import {useForm} from 'react-hook-form';
import './cart.css'
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

const emailValidator = require('email-validator');
const regions = ['Одеська область',
    'Дніпропетровська область',
    'Чернігівська область',
    'Харківська область',
    'Житомирська область',
    'Полтавська область',
    'Херсонська область',
    'Київська область',
    'Запорізька область',
    'Луганська область',
    'Донецька область',
    'Вінницька область',
    'Автономна Республіка Крим',
    'Миколаївська область',
    'Кіровоградська область',
    'Сумська область',
    'Львівська область',
    'Черкаська область',
    'Хмельницька область',
    'Волинська область',
    'Рівненська область',
    'Івано-Франківська область',
    'Тернопільська область',
    'Закарпатська область',
    'Чернівецька область']

export default function CartMain() {
    const {isEmpty} = useCart()
    return <div className={'empty-cart'}>
        {isEmpty && <span className={'empty'}>Кошик порожній</span>}
        {!isEmpty && <Cart/>}
    </div>
}

function Cart() {
    const {setItems, items, emptyCart, cartTotal} = useCart()
    const {isAuthenticated, user} = useAuth0();
    const navigate = useNavigate()
    const placeOrder = data => {
        let cartItems = {}
        for (const item of items) {
            cartItems[item.id] = item.quantity
        }
        fetch('http://localhost:3030/orders', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({...data, items: cartItems})
        }).then(() => emptyCart())
        if (isAuthenticated) {
            fetch(`http://localhost:3030/users/${user.sub}`, {
                method: 'PATCH', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({cart: {}, info: data})
            }).then(() => console.log('Info updated'))
        }
        navigate('/')
    }
    return <div className={'cart'}>
        <h1>Оформити замовлення</h1>
        <div className={'cart-main'}>
            <OrderInformation
                placeOrder={placeOrder}/>
            <div className={'cart-order'}>
                <CartContent items={items} cartTotal={cartTotal}/>
                <button onClick={() => setItems([])}>Clear</button>
            </div>
        </div>
    </div>
}

function OrderInformation(props) {
    const {isAuthenticated, user} = useAuth0();
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    useEffect(() => {
        if (!isAuthenticated) return
        fetch(`http://localhost:3030/users/${user.sub}`)
            .then(response => response.json())
            .then(json => reset(json.info))
    }, [isAuthenticated, reset, user])
    return <form className={'order'} onSubmit={handleSubmit(props.placeOrder)}>
        <span className={'order-label order-data'}>Адреса доставки:</span>
        <label className={'order-label'}>
            Область:
            <select className={'order-select'}{...register('region')}>
                {regions.map((region) => <option
                    key={region}>{region}</option>)}
            </select>
        </label>
        <SimpleFromInput label='Місто:'
                         register={register}
                         name='city'
                         errors={errors}/>
        <SimpleFromInput label='Відділення Нової пошти:'
                         register={register}
                         name='postOffice'
                         errors={errors}/>
        <span className={'order-label order-data'}>Отримувач:</span>
        <SimpleFromInput label="Ім'я:"
                         register={register}
                         name='firstName'
                         errors={errors}/>
        <SimpleFromInput label='Прізвище:'
                         register={register}
                         name='lastName'
                         errors={errors}/>
        <SimpleFromInput label='Електронна пошта:'
                         register={register}
                         name='email'
                         errors={errors}
                         validate={emailValidator}/>
        <SimpleFromInput label='Номер телефону:'
                         register={register}
                         name='phone'
                         type='tel'
                         errors={errors}
                         validate={isValidPhoneNumber}/>
        <input className={'order-submit'} type='submit' value='Замовити'/>
    </form>
}

function SimpleFromInput(props) {
    let errorClass = ' error'
    if (!props.errors[props.name]) errorClass = ''
    return <label className={'order-label'}>
        {props.label}
        <input
            className={`order-input${errorClass}`}
            type={props.type}
            {...props.register(props.name, {
                required: true, validate: props.validate
            })}/>
    </label>
}

function CartContent(props) {
    return <div className={'order-items'}>
        {props.items?.map((item) => <CartItem
            key={item.id}
            item={item}
        />)}
        <span>{props.cartTotal.toFixed(2)}грн</span>
    </div>
}

function CartItem(props) {
    const {name, quantity, price, id} = props.item
    const {updateItemQuantity, getItem} = useCart()
    return <>
        <br/>
        {id}:
        {name} -
        <button
            onClick={() => updateItemQuantity(id, getItem(id).quantity - 1)}>-</button>
        {quantity}
        <button
            onClick={() => updateItemQuantity(id, getItem(id).quantity + 1)}>+
        </button>
        x {price.toFixed(2)}
    </>
}