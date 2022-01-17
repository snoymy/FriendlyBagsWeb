import styles from "./Banner.module.css"
import {Link} from "react-router-dom";
import {useState} from "react";

const Banner = ({role, menu=[]}) => {
    const [clikedIndex, setClickedIndex] = useState(0)
    return (
        <div className={styles["top-banner"]}>
            <label className={styles["top-banner-company-name"]} style={{width:"250px"}}>Friendly Bags</label>
            <label className={styles["top-banner-role"]}>•</label>
            <label className={styles["top-banner-role"]} style={{width:"500px"}}>{role}</label>
            <div className={styles["top-navbar"]}>
                <ul>
                    {
                        menu.map((item, index) => 
                            <li key={index}>
                                <Link style={index === clikedIndex?{color:"red"}:{}} onClick={()=>setClickedIndex(index)} to={item.path}>
                                    {item.text}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div> 
    )
}

export default Banner;
