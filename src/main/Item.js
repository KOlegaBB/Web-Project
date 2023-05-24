import {useParams} from 'react-router'
import {useCart} from 'react-use-cart'
import {useEffect, useState} from 'react'
import './item.css'
import CarouselWrapper from './CarouselWrapper'

const publicURL = process.env.PUBLIC_URL

export default function Item() {
    const {id} = useParams()
    const {addItem, inCart, updateItemQuantity, getItem} = useCart()
    const [item, setItem] = useState({
        name: 'Loading',
        src: '',
        id: id,
        price: 0,
        type: '',
        tags: '',
        characteristics: '',
        description: ''
    })
    useEffect(() => {
        fetch(`http://localhost:3030/items/${id}`)
            .then((result) => result.json())
            .then((result) => setItem(result))
    }, [id, setItem])
    const addToCart = () => {
        if (!inCart(id)) {
            addItem(item)
        } else {
            updateItemQuantity(id, getItem(id).quantity + 1)
        }
    }

    return <div className={'item'}>
        <div className={'item-information'}>
            <img className={'item-information-image'} src={publicURL + item.src}
                 alt={'tomb'}/>
            <div className={'item-information-buy'}>
                <div className={'item-information-text'}>
                    <h2 className={'item-information-name'}>{item.name}</h2>
                    <div className={'item-information-tags'}>
                        {item.tag && <span
                            className={'item-information-tag'}>{item.tag}</span>}
                        <span
                            className={'item-information-tag'}>{item.type}</span>
                    </div>
                    <div className={'item-information-characteristics'}>
                        <span>Характеристики:</span>
                        <text>{item.characteristics}</text>
                    </div>
                    <div className={'item-information-description'}>
                        <span>Опис:</span>
                        <text>{item.description}</text>
                    </div>
                </div>
                <div className={'item-information-buying'}>
                    <span className={'item-information-price'}>
                        {item.price.toFixed(2)}грн
                    </span>
                    <button className={'item-information-button'}
                            onClick={addToCart}>
                        В кошик
                    </button>
                </div>
            </div>
        </div>
        <div className={'common-items'}>
            <h2 className={'item-information-name'}>Схожі пропозиції</h2>
            <CarouselWrapper className={'common-carousel'} value={item.type}
                             common={'type'}/>
        </div>
    </div>
}