import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import OrderStatus from "../../ui/content/orderStatus/OrderStatus";
// import NewArtWorkOrder from "../../ui/content/newArtWorkOrder/NewArtWorkOrder";
// import RecheckArtWork from "../../ui/content/recheckArtWork/RecheckArtWork";

const HeadOfMarketing = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "new-artwork-order":
                return (
                    <></> 
                )
            case "recheck-artwork":
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
            <Banner role="หัวหน้าแผนกการตลาด"
                menu={[
                    {
                        path:"/headofmarketing/check-block-order",
                        text:"Check Block&Order"
                    },
                    {
                        path:"/headofmarketing/Check Artwork",
                        text:"Check Artwork"
                    },
                    {
                        path:"/headofmarketing/order-status",
                        text:"สถานะออร์เดอร์"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default HeadOfMarketing;
