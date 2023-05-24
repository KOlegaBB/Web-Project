import {Link} from 'react-router-dom';
import './navToolbar.css'

export default function NavToolbar(props) {
    return <div className={'navigation'}>
        {props.values?.map((value, index) =>
            <Tab key={index} {...value}/>
        )}
    </div>
}

function Tab(props) {
    return <Link className={'nav-link'} to={props.url}
                 state={props.linkParams}>
        {props.text}
    </Link>;
}