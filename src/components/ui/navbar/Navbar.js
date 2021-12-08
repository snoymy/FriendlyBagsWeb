import {Link} from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    const mockContent = [
        {
            path:"#",
            text:"Open plastic bag order"
        },
        {
            path:"#",
            text:"Open paper bag order"
        },
        {
            path:"#",
            text:"Reject order"
        },
        {
            path:"#",
            text:"Open paper bag order"
        },
        {
            path:"#",
            text:"Open paper bag order"
        },
    ]
    return (
        <div className="top-navbar">
            <ul>
                {mockContent.map((item) => <li><Link to={item.path}>{item.text}</Link></li>)}
            </ul>
        </div>
    )
}

export default Navbar;
