import {useLocation, useNavigate} from 'react-router-dom';
import MultiRangeSlider from 'multi-range-slider-react';
import {useEffect, useState} from 'react';
import './itemList.css'

const publicURL = process.env.PUBLIC_URL

export default function ItemList() {
    const location = useLocation()
    const [tags, setTags] = useState(location?.state?.tags || [])
    const [types, setTypes] = useState(location?.state?.types || [])
    const [priceBoundary, setBoundary] = useState([0, 50000])
    const [items, setItems] = useState([])
    useEffect(() => {
        let rawURL = `http://localhost:3030/items?` +
            `price_gte=${priceBoundary[0]}&` +
            `price_lte=${priceBoundary[1]}`
        for (const tag of tags) rawURL = rawURL + `&tag=${tag}`
        for (const type of types) rawURL = rawURL + `&type=${type}`
        fetch(rawURL)
            .then((result) => result.json())
            .then((json) => setItems(json))
    }, [tags, types, priceBoundary])

    return <div className={'catalog'}>
        <SideBar tags={tags}
                 setTags={setTags}
                 types={types}
                 setTypes={setTypes}
                 boundary={priceBoundary}
                 setBoundary={setBoundary}
        />
        <Items items={items}/>
    </div>
}

function SideBar(props) {
    return <aside className={'items-sorting'}>
        <h1>Каталог:</h1>
        <Sorting
            header={'Сортувати за тегами:'}
            selected={props.tags}
            values={['Новинки', 'Хіти', 'Акції']}
            setSelected={props.setTags}/>
        <Sorting
            header={'Сортувати за типами:'}
            selected={props.types}
            values={['Труна', 'Вінок', 'Могильний камінь', 'Квіти', 'Свічка']}
            setSelected={props.setTypes}/>
        <span className={'head-name'}>Сортування за ціною:</span>
        <MultiRangeSlider
            min={0}
            max={50000}
            step={1000}
            minValue={props.boundary[0]}
            maxValue={props.boundary[1]}
            ruler={false}
            stepOnly={false}
            onChange={result => props.setBoundary([result.minValue, result.maxValue])}/>
    </aside>
}

function Sorting(props) {
    const selected = props.selected
    const onAdd = (newValue) => props.setSelected(selected.concat([newValue]))
    const onRemove = (removedValue) => {
        props.setSelected(selected.filter((value) => value !== removedValue))
    }
    return <>
        <span className={'head-name'}>{props.header}</span>
        {props.values?.map(tag => <SortingTag key={tag}
                                              value={tag}
                                              onSet={onAdd}
                                              onReset={onRemove}
                                              checked={props.selected.includes(tag)}
        />)}
    </>
}

function SortingTag(props) {
    return <>
        <label className={'value-input'}>{props.value}
            <input type={'checkbox'}
                   onChange={(event) => {
                       if (event.target.checked)
                           props.onSet(props.value)
                       else
                           props.onReset(props.value)
                   }}
                   checked={props.checked}/>
        </label>
    </>

}

function Items(props) {
    return <div className={'items'}>
        {props.items?.map((item, index) => <ItemCard
            key={index} {...item}></ItemCard>)}
    </div>
}

function ItemCard(props) {
    const navigate = useNavigate()
    return <div className={'item-list-card'}>
        <img className={'item-list-img'} src={publicURL + props.src}
             alt={props.id}/>
        <div className={'item-info'}>
            <span className={'item-text'}>{props.name}</span>
            <div className={'item-buy'}>
                <span className={'item-price'}>
                    {props.price.toFixed(2)}грн
                </span>
                <button className={'buy-button'}
                        onClick={() => navigate(`/items/${props.id}`)}>
                    Купити
                </button>
            </div>
        </div>
    </div>
}
