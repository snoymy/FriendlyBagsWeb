import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import OrderStatus from "../../ui/content/orderStatus/OrderStatus";
import CheckArtWork from "../../ui/content/checkArtWork/CheckArtWork";
import ProductionDetail from "../../ui/content/productionDetail/ProductionDetail";
import MachineScheduling from "../../ui/content/machineScheduling/MachineScheduling";
// import NewArtWorkOrder from "../../ui/content/newArtWorkOrder/NewArtWorkOrder";
// import RecheckArtWork from "../../ui/content/recheckArtWork/RecheckArtWork";

const HeadOfPlastic = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "production-details":
                return (
                <ProductionDetail/>
                )
            case "check-artwork":
                return (
                    <CheckArtWork filter={{bagType:"พลาสติก"}}/>
                )
            case "machine-scheduling":
                return (
                    <MachineScheduling/>
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
            <Banner role="หัวหน้าแผนก Plastic"
                menu={[
                    {
                        path:"/headofplastic/production-details",
                        text:"Production Details"
                    },
                    {
                        path:"/headofplastic/check-artwork",
                        text:"Check Artwork"
                    },
                    {
                        path:"/headofplastic/machine-scheduling",
                        text:"Machine Scheduling"
                    },
                    {
                        path:"/headofplastic/order-status",
                        text:"สถานะออร์เดอร์"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default HeadOfPlastic;
