import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import Navbar from "../../ui/navbar/Navbar";
import OpenPaperBagOrderForm from "./content/openPaperBagOrderForm/OpenPaperBagOrderForm";

const Sales = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "open-paper-bag-order":
                return (
                    <OpenPaperBagOrderForm/>
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
                        path:"/sales",
                        text:"สถานะออร์เดอร์"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default Sales;
