import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './itemCard.css'
import './main.css'
import {useState} from 'react';
import CarouselWrapper from './CarouselWrapper';
import {useNavigate} from "react-router-dom";

const publicURL = process.env.PUBLIC_URL

export default function Main() {
    const navigate = useNavigate()
    return <div className={'main'}>
        <img className={'sale'} src={publicURL + '/assets/sale.png'}
             alt={'sale'} onClick={() => navigate('/items/45')}/>
        <SpecialPropositions tags={['Новинки', 'Хіти', 'Акції']}/>
    </div>
}

function SpecialPropositions(props) {
    const [chosen, setChosen] = useState(props.tags[0])
    return <>
        <TagsToolbar onChoose={setChosen} tags={props.tags}/>
        <CarouselWrapper value={chosen} common={'tag'}/>
    </>
}

function TagsToolbar(props) {
    return <div className={'tags'}>
        {props.tags?.map(tag =>
            <button className={'tag-button'} key={tag}
                    onClick={() => props.onChoose(tag)}>
                {tag}
            </button>)}
    </div>
}
