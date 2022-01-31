import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import OrderStatus from "../../ui/content/orderStatus/OrderStatus";
import CheckArtWork from "../../ui/content/checkArtWork/CheckArtWork";
// import NewArtWorkOrder from "../../ui/content/newArtWorkOrder/NewArtWorkOrder";
// import RecheckArtWork from "../../ui/content/recheckArtWork/RecheckArtWork";

const HeadOfPrinting = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "production-details":
                return (
                    <></>
                )
            case "check-artwork":
                return (
                    <CheckArtWork filter={{bagType:"กระดาษ"}}/>
                )
            case "machine-scheduling":
                return (
                    <></>
                )
            case "order-status":
                return (
                    <OrderStatus/>
                )
            default:
                return (
                    <></> 
                )
        }
    }

    return (
        <>
            <Banner role="หัวหน้าแผนก Printing"
                menu={[
                    {
                        path:"/headofprinting/production-details",
                        text:"Production Details"
                    },
                    {
                        path:"/headofprinting/check-artwork",
                        text:"Check Artwork"
                    },
                    {
                        path:"/headofprinting/machine-scheduling",
                        text:"Machine Scheduling"
                    },
                    {
                        path:"/headofprinting/order-status",
                        text:"สถานะออร์เดอร์"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default HeadOfPrinting;
