import {Link} from "react-router-dom";
import "./Navbar.css"

const Navbar = ({menu}) => {
    return (
        <div className="top-navbar">
            <ul>
                {menu.map((item, index) => <li key={index}><Link to={item.path}>{item.text}</Link></li>)}
            </ul>
        </div>
    )
}

export default Navbar;
