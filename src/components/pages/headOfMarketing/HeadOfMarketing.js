import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import OrderStatus from "../../ui/content/orderStatus/OrderStatus";
import ApproveOrder from "../../ui/content/approveOrder/ApproveOrder";
import CheckArtWork from "../../ui/content/checkArtWork/CheckArtWork";
// import NewArtWorkOrder from "../../ui/content/newArtWorkOrder/NewArtWorkOrder";
// import RecheckArtWork from "../../ui/content/recheckArtWork/RecheckArtWork";

const HeadOfMarketing = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "approve-order":
                return (
                    <ApproveOrder filter={{}}/>
                )
            case "check-artwork":
                return (
                    <CheckArtWork/>
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
                        path:"/headofmarketing/approve-order",
                        text:"Approve Order"
                    },
                    {
                        path:"/headofmarketing/check-artwork",
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
