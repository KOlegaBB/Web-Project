import {Carousel} from 'react-responsive-carousel';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const publicURL = process.env.PUBLIC_URL

export default function CarouselWrapper(props) {
    const [items, setItems] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:3030/items')
            .then(result => result.json())
            .then(jsonResult => setItems(jsonResult
                .filter(item => (item[props.common] === props.value))))
    }, [props, setItems])
    return <Carousel className={'carousel'}
                     showThumbs={false}
                     infiniteLoop={true}
                     centerMode={true}
                     showStatus={false}
                     centerSlidePercentage={33}
                     onClickItem={(index, item) =>
                         navigate(`/items/${item.props.id}`)}
                     axis={'horizontal'}>
        {items?.map((item, index) => <CarouselItemCard
            key={index} {...item}/>)}
    </Carousel>
}

function CarouselItemCard(props) {
    return <div className={'item-card'}>
        <img className={'item-img'} src={publicURL + props.src}
             alt={props.id}/>
        <div className={'item-info'}>
            <span className={'item-text item-name'}>{props.name}</span>
            <span className={'item-text item-price'}>
                {props.price.toFixed(2)}грн
            </span>
        </div>
    </div>
}
