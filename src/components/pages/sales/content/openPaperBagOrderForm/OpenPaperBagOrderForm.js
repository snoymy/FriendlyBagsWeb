import {useState } from "react"
import PaperBagOrder from "./PaperBagOrderForm"
import NameForm from "./NameForm"
import styles from "./OpenPaperBagOrderForm.module.css"

const OpenPaperBagOrderForm = () => {
    const [customerType, setCustomerType] = useState("newCustomer") 
    const [test, setTest] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [nameForm, setNameForm] = useState({
                                                fname:"",
                                                lname:"",
                                                date:"",
                                                address:""
                                            })

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

    const addItem = () => {
        let newOrder = {
            paperType:"HD",
            paperThickness:"",
            bagSize:"M",
            shape:"",
            bagEars:"",
            colorAmount:"",
            baseColor:"",
            color:"",
            quantity:"",
            price:""
        }
        setOrderDetails([...orderDetails, newOrder])
    }

    const clearItem = () => {
        setOrderDetails([])
    }

    return (
        <div>
            {/*}
            <input type="radio" id="newCustomer" name="customerType" value="newCustomer" defaultChecked onChange={(event)=>setCustomerType(event.target.value)}/>
            <label htmlFor="newCustomer">ลูกค้าใหม่</label>
            <input type="radio" id="oldCustomer" name="customerType" value="oldCustomer" onChange={(event)=>setCustomerType(event.target.value)}/>
            <label htmlFor="oldCustomer">ลูกค้าเก่า</label><br/>

            {customerType === "oldCustomer" ? NameSearch():<></>}
            {*/}
            <div className={styles["paper-bag-order-form"]}>
                <h1>ใบสั่งพิมพ์ ORDER กระดาษ</h1>
                <form onSubmit={(event) => {event.preventDefault()}}>
                    <NameForm nameForm={nameForm} setNameForm={setNameForm}/>
                    <PaperBagOrder orderDetails={orderDetails} setOrderDetails={setOrderDetails}/>

                    <button type="button" onClick={addItem}>+Add</button>
                    <button type="button" onClick={clearItem}>Clear</button>
                    <button type="button">Order history</button>
                    <button type="button" onClick={() => {alert("confirm")}}>Confirm</button>
                </form> 
            </div>
        </div>
    )
}

export default OpenPaperBagOrderForm;
