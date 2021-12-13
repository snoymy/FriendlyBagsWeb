import "./Banner.css"

const Banner = ({role}) => {
    return (
        <div className="top-banner">
            <p className="top-banner-company-name">Friendly Bags</p>
            <p className="top-banner-role">•</p>
            <p className="top-banner-role">{role}</p>
        </div> 
    )
}

export default Banner;
