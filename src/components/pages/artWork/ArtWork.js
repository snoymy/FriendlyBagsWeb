import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import OrderStatus from "../../ui/content/orderStatus/OrderStatus";
import NewArtWorkOrder from "../../ui/content/newArtWorkOrder/NewArtWorkOrder";
import RecheckArtWork from "../../ui/content/recheckArtWork/RecheckArtWork";
import LasorFilm from "../../ui/content/lasorFilm/LasorFilm";

const ArtWork = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "new-artwork-order":
                return (
                    <NewArtWorkOrder/> 
                )
            case "recheck-artwork":
                return (
                    <RecheckArtWork/> 
                )
            case "lasor-film":
                return (
                    <LasorFilm/> 
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
            <Banner role="Art Work"
                menu={[
                    {
                        path:"/artwork/new-artwork-order",
                        text:"New Artwork Order"
                    },
                    /*
                    {
                        path:"/artwork/recheck-artwork",
                        text:"Recheck Artwork"
                    },
                    {
                        path:"/artwork/new-comment",
                        text:"New Comment"
                    },
                    */
                    {
                        path:"/artwork/lasor-film",
                        text:"Lasor Film"
                    },
                    {
                        path:"/artwork/order-status",
                        text:"สถานะออร์เดอร์"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default ArtWork;
