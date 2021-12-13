import { useParams } from "react-router";
import Banner from "../../ui/banner/Banner";
import Navbar from "../../ui/navbar/Navbar";
import OpenPaperBagOrderForm from "./content/openPaperBagOrderForm/OpenPaperBagOrderForm";

const Sales = () => {
    const {type} = useParams()
    console.log(type)

    const Content = () => {
        switch(type){
            case "paper":
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
            <Banner role="Sales"/>
            <Navbar
                menu={[
                    {
                        path:"/sales",
                        text:"Open plastic bag order"
                    },
                    {
                        path:"/sales/paper",
                        text:"Open paper bag order"
                    },
                    {
                        path:"/sales",
                        text:"Reject order"
                    },
                    {
                        path:"/sales",
                        text:"Open paper bag order"
                    },
                    {
                        path:"/sales",
                        text:"Open paper bag order"
                    },
                ]}
            />
            <Content/>
        </>
    )
}

export default Sales;
