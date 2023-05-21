import {useNavigate} from "react-router-dom"

const public_url = process.env.PUBLIC_URL
fetch("http://localhost:3030/items")
    .then((result) => result.json())
    .then((json_result) => items = json_result).catch(() => console.log("Error"))
let items = []

export default function ItemList(props) {
    return <div className={"catalog"}>
        <h1>Каталог:</h1>
        <Sorting tags={["Труна", "Вінок", "Пам’ятник", "Хрест"]}/>
        <br/>
        <Items items={items}/>
    </div>
}

function Sorting(props) {
    return <>
        <span>Сортувати за тегами:</span>
        {props.tags?.map((tag) => <SortingTag key={tag} value={tag}/>)}
    </>
}

function SortingTag(props) {
    return <button>{props.value}</button>
}

function Items(props) {
    return <>
        {props.items?.map((item) => <Item key={item.id} {...item}></Item>)}
    </>
}

function Item(props) {
    const navigate = useNavigate()
    return <>
        <img src={public_url + props.src}
             alt={props.id}
             onClick={() => navigate(`${props.id}`)}/>
        <span>{props.name}</span>
        <span>{props.price.toFixed(2)}</span>
    </>
}
