import { useState } from "react"
import PaperBagOrder from "./PaperBagOrderForm"
import NameForm from "./NameForm"
import styles from "./OpenPaperBagOrderForm.module.css"
import "./container.css"
import BackEndInterface from "../../../../../BackEndInterface"
import Modal from "../../../../ui/modal/Modal"

const getPaperType = () => {
    return ["KW", "KI", "กระดาษขาว", "KA", "ART"]
}

const getPaperThickness = () => {
    return ["thick1", "thick2"]
}

const getShape = () => {
    return ["ตั้ง", "ขวาง"]
}

const getBagEar = () => {
    return ["หูเจาะ", "หูช็อปปิ้ง", "หูเชือก", "เกลียวมัด"]
}

const getColorAmount = () => {
    return {min:0, max:4}
}

const getQuantity = () => {
    return {min:1}
}

const getUnit = () => {
    return ["ใบ","กิโล","ลูก"]
}

const getPrice = () => {
    return {min:0}
}

const getWorkType = () => {
    return {sell:"sell", print:"print"}
}

const getPattern = () => {
    return ["pattern1", "pattern2"] 
}

const getBagSize = () => {
    let bagSize = []

    for(let i = 0; i < 24; i++){
        bagSize = [...bagSize, "ตัด"+ (i+1)]
    }

    return bagSize
}

const getDesign = () => {
    return ""
}

const getColor = () => {
    //get from database
    return BackEndInterface.getBaseColor()
}

const getBaseColor = () => {
    //get from database
    return BackEndInterface.getBaseColor()
}

const sentDataToBackEnd = (order) => {
    BackEndInterface.sentOrder(order)
}

const OpenPaperBagOrderForm = () => {
    const [showCheckWorkNameModal, setShowCheckWorkNameModal] = useState(false)
    const [showCheckNameFormModal, setShowCheckNameFormModal] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [addVAT, setAddVAT] = useState(false)
    const [nameForm, setNameForm] = useState({
        name:{value:"", editable:true},
        date:{value:"", editable:true},
        deadline:{value:"", editable:true},
        address:{value:"", editable:true}
    })

    const resetPageValue = () => {
        setShowCheckNameFormModal(false)
        setShowCheckWorkNameModal(false)
        setOrderDetails([])
        setAddVAT(false)
        setNameForm({
                name:{value:"", editable:true},
                date:{value:"", editable:true},
                deadline:{value:"", editable:true},
                address:{value:"", editable:true}
        })
    }

    const menuValue = {
        workName:"",
        paperType: getPaperType(),
        paperThickness: getPaperThickness(),
        bagSize: getBagSize(),
        bagShape: getShape(),
        bagEars: getBagEar(),
        colorAmount: getColorAmount(),
        color: getColor(),
        baseColorCheck:false,
        baseColor:getBaseColor(),
        quantity: getQuantity(),
        unit: getUnit(),
        price: getPrice(),
        comment:"",
        workType: getWorkType(),
        pattern: getPattern(),
        design: getDesign(),
        sameBlock: false,
        sameColor: false
    }

    const checkPrice = () => {
        let status = false
        orderDetails.map((item, index) => {
            if(item.price.value == 0){
                status = true
            }
        }) 
        
        return status
    }

    const checkWorkName = () => {
        let status = false
        orderDetails.map((item, index) => {
            if(item.workName.value == 0){
                status = true
            }
        }) 
        
        return status
    }

    const checkNameForm = () => {
        let status = false

        console.log("form", nameForm)
        if(nameForm.name.value === "" || nameForm.address.value === "" || nameForm.date.value === "" || nameForm.deadline.value === ""){
            status = true
        }

        return status
    }

    const packDataAndSent = () => {
        let order = []  

        if(checkNameForm()){
            setShowCheckNameFormModal(true)
            return
        }

        if(checkWorkName()){
            setShowCheckWorkNameModal(true)
            return
        }
        orderDetails.map((item) => {
            const data = {
                date:               nameForm.date.value,
                deadline:           nameForm.deadline.value,
                name:               nameForm.name.value,
                address:            nameForm.address.value,
                workName:           item.workName.value,
                paperType:          item.paperType.value,
                paperThickness:     item.paperThickness.value,
                bagSize:            item.bagSize.value,
                bagShape:           item.bagShape.value,
                bagEars:            item.bagEars.value,
                colorAmount:        item.colorAmount.value,
                color:              item.color.value,
                baseColorCheck:     item.baseColorCheck.value,
                baseColor:          item.baseColor.value,
                quantity:           item.quantity.value,
                unit:               item.unit.value,
                price:              item.price.value,
                workType:           item.workType.value,
                pattern:            item.pattern.value,
                comment:            item.comment.value,
                sameBlock:          item.sameBlock,
                sameColor:          item.sameColor,
            }
            order = [...order, data]
        })
        console.log(order)
        sentDataToBackEnd(order)
        alert("Success!")
        resetPageValue()
    }

    const calprice = () => {
        let sum = 0
        orderDetails.map((item)=>{
            let vat = 0
            if(addVAT){
                vat = item.price.value * item.quantity.value * 0.07
            }
            sum += item.price.value * item.quantity.value + vat
        })

        return sum
    }
    const modalContentWorkNameCheck = (
        <div style={{padding:"30px"}}>
            <label>โปรดระบุชื่องานให้ครบทุกลำดับ</label>
            <div style={{textAlign:"right", marginRight:"30px", marginTop:"30px"}}>
                <button type="button" onClick={() => setShowCheckWorkNameModal(false)}>close</button>
            </div>
        </div>
    )

    const modalContentNameFormCheck = (
        <div style={{padding:"30px"}}>
            <label>โปรดระบุรายละเอียดลูกค้าให้ครบถ้วน</label>
            <div style={{textAlign:"right", marginRight:"30px", marginTop:"30px"}}>
                <button type="button" onClick={() => setShowCheckNameFormModal(false)}>close</button>
            </div>
        </div>
    )

    return (
        <div style={{marginBottom:"100px"}}>
            <div className={styles["paper-bag-order-form"]}>
                <center><h1>ใบสั่งพิมพ์ ORDER กระดาษ</h1></center>
                <div className="container">
                    <NameForm nameForm={nameForm} setNameForm={setNameForm}/>
                    <PaperBagOrder orderDetails={orderDetails} setOrderDetails={setOrderDetails} menuValue={menuValue} customerName={nameForm.name.value}/>
                    <label>VAT 7%</label>
                    <input type="checkbox" name="VAT" id="VAT" checked={addVAT} onChange={(event) => setAddVAT(event.target.checked)}/>
                    <input type="button" id="file-upload" style={{display:"none"}}/>
                    <div style={{display:"inline-block", margin:"0 10px"}}>
                        <div style={{display:"inline-block", padding: "0 5px", width: "50px", textAlign: "right", border: "2px solid #d7d7d7", borderRadius:"5px"}}>
                            <label>{calprice()}</label>
                        </div>
                        <label>Baht</label>
                    </div>
                    <button type="button" onClick={()=>document.getElementById("file-upload").click()}>OP/แบหลักฐานการสั่งซื้อ</button><br/><br/>
                    <button type="button" disabled={orderDetails.length > 0 ? false : true} onClick={packDataAndSent}>Submit</button>
                    {checkPrice() ? <label style={{color: "#ee0000"}}>คำเตือน: พบรายการที่ราคาเท่ากับ 0</label> : null}
                    <Modal style={{width:"500px"}} content={modalContentWorkNameCheck} showModal={showCheckWorkNameModal} setShowModal={setShowCheckWorkNameModal}/>
                    <Modal style={{width:"500px"}} content={modalContentNameFormCheck} showModal={showCheckNameFormModal} setShowModal={setShowCheckNameFormModal}/>
                </div>
            </div>
        </div>
    )
}

export default OpenPaperBagOrderForm;
