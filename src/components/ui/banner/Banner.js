import styles from "./Banner.module.css"
import {Link} from "react-router-dom";

const Banner = ({role, menu=[]}) => {
    return (
        <div className={styles["top-banner"]}>
            <label className={styles["top-banner-company-name"]} style={{width:"250px"}}>Friendly Bags</label>
            <label className={styles["top-banner-role"]}>•</label>
            <label className={styles["top-banner-role"]} style={{width:"500px"}}>{role}</label>
            <div className={styles["top-navbar"]}>
                <ul>
                    {menu.map((item, index) => <li key={index}><Link to={item.path}>{item.text}</Link></li>)}
                </ul>
            </div>
        </div> 
    )
}

export default Banner;
