import {useState } from "react"
import PaperBagOrder from "./PaperBagOrderForm"
import NameForm from "./NameForm"
import styles from "./OpenPaperBagOrderForm.module.css"
import "./container.css"

const OpenPaperBagOrderForm = () => {
    const [customerType, setCustomerType] = useState("newCustomer") 
    const [test, setTest] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [nameForm, setNameForm] = useState({
        fname:{value:"", editable:true},
        lname:{value:"", editable:true},
        date:{value:"", editable:true},
        address:{value:"", editable:true}
                                            })

    const menuValue = {
        paperType:["paper1", "paper2"],
        paperThickness:["thick1", "thick2"],
        bagSize:["S", "M", "L"],
        shape:["shape1", "shape2"],
        bagEars:["bagear1", "bagear2"],
        colorAmount:"1",
        baseColor:false,
        color:["color1", "color2"],
        quantity:"1",
        price:"",
        comment:"",
        workType:{sell:"sell", print:"print"}
    }

    const mockDataBase = [
        {
            fname:"user",
            lname:"test"
        }
    ]

    const NameSearch = () => {

        const checkName = () => {
            setTest(true)
        }
        return (
            <form onSubmit={(event) => {event.preventDefault(); checkName()}}>
                <input type="text" id="fname" name="fname" placeholder="First Name"/>
                <input type="text" id="lname" name="lname" placeholder="Last Name"/>
                <button type="submit">Search</button>
                {test?<p></p>:<></>}
            </form> 
        )
    }

    const addNewOrder = () => {
        let newOrder = {
            paperType: {value:menuValue.paperType[0], editable:true},
            paperThickness: {value:menuValue.paperThickness[0], editable:true},
            bagSize: {value:menuValue.bagSize[0], editable:true},
            shape: {value:menuValue.shape[0], editable:true},
            bagEars: {value:menuValue.bagEars[0], editable:true},
            colorAmount: {value:menuValue.colorAmount, editable:true},
            baseColor: {value:menuValue.baseColor, editable:true},
            color: {value:menuValue.color[0], editable:true},
            quantity: {value:menuValue.quantity, editable:true},
            price: {value:menuValue.price, editable:true},
            workType: {value:menuValue.workType.sell, editable:true},
            comment: {value:menuValue.comment, editable:true},
        }

        setOrderDetails([...orderDetails, newOrder])
    }

    const clearItem = () => {
        setOrderDetails([])
    }

    return (
        <div style={{marginBottom:"100px"}}>
            {/*}
            <input type="radio" id="newCustomer" name="customerType" value="newCustomer" defaultChecked onChange={(event)=>setCustomerType(event.target.value)}/>
            <label htmlFor="newCustomer">ลูกค้าใหม่</label>
            <input type="radio" id="oldCustomer" name="customerType" value="oldCustomer" onChange={(event)=>setCustomerType(event.target.value)}/>
            <label htmlFor="oldCustomer">ลูกค้าเก่า</label><br/>

            {customerType === "oldCustomer" ? NameSearch():<></>}
            {*/}
            <div className={styles["paper-bag-order-form"]}>
                <center><h1>ใบสั่งพิมพ์ ORDER กระดาษ</h1></center>
                <div className="container">
                    <NameForm nameForm={nameForm} setNameForm={setNameForm}/>
                    <PaperBagOrder orderDetails={orderDetails} setOrderDetails={setOrderDetails} menuValue={menuValue}/>

                    <button type="button" onClick={addNewOrder}>+Add Order</button>
                    <button type="button">Order history</button>
                    <button className={styles["paper-bag-order-form-clear-button"]} type="button" onClick={clearItem}>Clear All Order</button>
                    <button type="button" onClick={() => {alert("confirm")}}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default OpenPaperBagOrderForm;
