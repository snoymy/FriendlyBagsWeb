import {useState } from "react"
import PaperBagOrder from "./PaperBagOrderForm"
import NameForm from "./NameForm"
import Modal from "../../../../ui/modal/Modal"
import styles from "./OpenPaperBagOrderForm.module.css"
import "./container.css"
import DataBase from "../../../../../MockDatabase"

const OpenPaperBagOrderForm = () => {
    const [showModal, setShowModal] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [nameForm, setNameForm] = useState({
        fname:{value:"", editable:true},
        lname:{value:"", editable:true},
        date:{value:"", editable:true},
        address:{value:"", editable:true}
                                            })

    const getBagSize = () => {
        let bagSize = []

        for(let i = 0; i < 24; i++){
            bagSize = [...bagSize, "ตัด"+ (i+1)]
        }

        return bagSize
    }

    const getBaseColor = () => {
        //get from database
        return DataBase.getBaseColor()
    }

    const menuValue = {
        paperType:["KW", "KI", "กระดาษขาว", "KA", "ART"],
        paperThickness:["thick1", "thick2"],
        bagSize:getBagSize(),
        shape:["ตั้ง", "ขวาง"],
        bagEars:["หูเจาะ", "หูช็อปปิ้ง", "หูเชือก", "เกลียวมัด"],
        colorAmount:{min:0, max:4},
        baseColorCheck:false,
        baseColor:getBaseColor(),
        color:"",
        quantity:{min:1},
        unit:[""],
        price:{min:0},
        comment:"",
        workType:{sell:"sell", print:"print"}
    }

    const addNewOrder = () => {
        let newOrder = {
            paperType: {value:menuValue.paperType[0], editable:true},
            paperThickness: {value:menuValue.paperThickness[0], editable:true},
            bagSize: {value:menuValue.bagSize[0], editable:true},
            shape: {value:menuValue.shape[0], editable:true},
            bagEars: {value:menuValue.bagEars[0], editable:true},
            colorAmount: {value:menuValue.colorAmount.min, editable:true},
            baseColorCheck: {value:menuValue.baseColorCheck, editable:true},
            baseColor: {value:menuValue.baseColor[0], editable:false},
            color: {value:menuValue.color, editable:true},
            quantity: {value:menuValue.quantity.min, editable:true},
            price: {value:menuValue.price.min, editable:true},
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
                    <button type="button" onClick={() => setShowModal(true)}>Order history</button>
                    <button className={styles["paper-bag-order-form-clear-button"]} type="button" onClick={clearItem}>Clear All Order</button>
                    <button type="button" onClick={() => {alert("confirm")}}>Confirm</button>
                </div>
                <Modal showModal={showModal} setShowModal={setShowModal}/>
            </div>
        </div>
    )
}

export default OpenPaperBagOrderForm;
