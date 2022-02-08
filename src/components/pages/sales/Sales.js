import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import OpenPaperBagOrderForm from "../../ui/content/openPaperBagOrderForm/OpenPaperBagOrderForm";
import OpenPlasticBagOrderForm from "../../ui/content/openPlasticBagOrderForm/OpenPlasticBagOrderForm";
import OrderStatus from "../../ui/content/orderStatus/OrderStatus";

const Sales = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "open-paper-bag-order":
                return (
                    <OpenPaperBagOrderForm/>
                )
            case "open-plastic-bag-order":
                return (
                    <OpenPlasticBagOrderForm/>
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
            <Banner role="Sales"
                menu={[
                    {
                        path:"/sales/open-paper-bag-order",
                        text:"เปิดออร์เดอร์ถุงกระดาษ"
                    },
                    {
                        path:"/sales/open-plastic-bag-order",
                        text:"เปิดออร์เดอร์ถุงพลาสติก"
                    },
                    {
                        path:"/sales",
                        text:"Rejected order"
                    },
                    {
                        path:"/sales/order-status",
                        text:"สถานะออร์เดอร์"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default Sales;
