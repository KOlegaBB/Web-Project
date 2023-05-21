import {Link} from "react-router-dom";
import './navToolbar.css'

export default function NavToolbar(props) {
    return <div className={"navigation"}>
        {props.values?.map((value) => <Tab key={value.name}
                                           value={value.name}
                                           url={value.url}/>)}
    </div>
}

function Tab(props) {
    return <Link className={"nav-link"} to={props.url}>
        {props.value}
    </Link>;
}