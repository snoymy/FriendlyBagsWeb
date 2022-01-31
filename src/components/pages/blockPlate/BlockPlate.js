import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import OrderStatus from "../../ui/content/orderStatus/OrderStatus";
import OrderBlockPlate from "../../ui/content/orderBlockPlate/OrderBlockPlate";

const BlockPlate = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "order-block-plate":
                return (
                    <OrderBlockPlate/>
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
            <Banner role="Block/Plate"
                menu={[
                    {
                        path:"/blockplate/order-block-plate",
                        text:"Order Block/Plate"
                    },
                    {
                        path:"/blockplate/order-status",
                        text:"สถานะออร์เดอร์"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default BlockPlate;
