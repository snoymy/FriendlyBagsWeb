import { useState, useEffect } from "react"
import PlasticBagOrder from "./PlasticBagOrderForm"
import NameForm from "./NameForm"
import styles from "./OpenPlasticBagOrderForm.module.css"
import ContainerStyles from "./container.module.css"
import BackEndInterface from "../../../../BackEndInterface"
import Modal from "../../modal/Modal"

const getType = () => {
    return ["เสื้อกล้าม", "เจาะ"]
}

const getPlasticThickness = () => {
    return {min:0, max:4}
}

const getBagMat = () => {
    return ["PE", "HD.A", "HD.B"]
}

const getBagSide = () => {
    return {min:0}
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

const getPrintFace = () => {
    return {min:0, max:2}
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
    return {length:0, width:0} 
}

const getDesign = () => {
    return ""
}

const getArea = () => {
    let area = []
    for(let i = 0; i < 3; i++){
        area = [...area, "N"+(i+1)]
    }
    for(let i = 0; i < 3; i++){
        area = [...area, "C"+(i+1)]
    }
    for(let i = 0; i < 4; i++){
        area = [...area, "E"+(i+1)]
    }
    for(let i = 0; i < 3; i++){
        area = [...area, "S"+(i+1)]
    }
    for(let i = 0; i < 8; i++){
        area = [...area, "กทม "+(i+1)]
    }

    return area
}

const sentDataToBackEnd = async (order) => {
    await BackEndInterface.sentNewOrder(order)
    alert("Success!")
}

const OpenPlasticBagOrderForm = () => {
    const [showCheckWorkNameModal, setShowCheckWorkNameModal] = useState(false)
    const [showCheckNameFormModal, setShowCheckNameFormModal] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [addVAT, setAddVAT] = useState(false)
    const [colorMenu, setColorMenu] = useState()
    const [matColorMenu, setMatColorMenu] = useState()
    const [nameForm, setNameForm] = useState({
        name:{value:"", editable:true},
        date:{value:"", editable:true},
        deadline:{value:"", editable:true},
        address:{value:"", editable:true},
        area:{value:"", editable:true},
    })

    const getColor = async () => {
        const colors = await BackEndInterface.getColor()

        setColorMenu(colors)
    }

    const getBagMatColor = async () => {
        const colors = await BackEndInterface.getMatColor()

        setMatColorMenu(colors)
    }

    useEffect(() => {
        getColor()
        getBagMatColor()
    }, [])

    const resetPageValue = () => {
        setShowCheckNameFormModal(false)
        setShowCheckWorkNameModal(false)
        setOrderDetails([])
        setAddVAT(false)
        setNameForm({
                name:{value:"", editable:true},
                date:{value:"", editable:true},
                deadline:{value:"", editable:true},
                address:{value:"", editable:true},
                area:{value:"", editable:true},
        })
    }

    const menuValue = {
        area: getArea(),
        workName:"",
        type: getType(),
        bagSize: getBagSize(),
        bagMat: getBagMat(),
        bagMatColor: matColorMenu,
        bagSide: getBagSide(),
        plasticThickness: getPlasticThickness(),
        printFace: getPrintFace(),
        colorAmount: getColorAmount(),
        color: colorMenu,
        quantity: getQuantity(),
        unit: getUnit(),
        price: getPrice(),
        emboss: false,
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
                area:               nameForm.area.value,
                date:               nameForm.date.value,
                deadline:           nameForm.deadline.value,
                name:               nameForm.name.value,
                address:            nameForm.address.value,
                workName:           item.workName.value,
                type:               item.type.value,
                plasticThickness:   item.plasticThickness.value,
                bagSize:            {length:item.bagSizeLength.value, width:item.bagSizeWidth.value},
                bagMat:             item.bagMat.value,
                bagMatColor:        item.bagMatColor.value,
                bagSide:            item.bagSide.value,
                printFace:          item.printFace.value,
                colorAmountFront:   item.colorAmountFront.value,
                colorAmountBack:    item.colorAmountBack.value,
                colorFront:         [
                                        (item.colorAmountFront.value >= 1 ? item.colorFront1.value : undefined),
                                        (item.colorAmountFront.value >= 2 ? item.colorFront2.value : undefined),
                                        (item.colorAmountFront.value >= 3 ? item.colorFront3.value : undefined),
                                        (item.colorAmountFront.value >= 4 ? item.colorFront4.value : undefined)
                                    ],
                colorBack:          [
                                        (item.colorAmountBack.value >= 1 ? item.colorBack1.value : undefined),
                                        (item.colorAmountBack.value >= 2 ? item.colorBack2.value : undefined),
                                        (item.colorAmountBack.value >= 3 ? item.colorBack3.value : undefined),
                                        (item.colorAmountBack.value >= 4 ? item.colorBack4.value : undefined)
                                    ],
                colorFront1:        (item.colorAmountFront.value >= 1 ? item.colorFront1.value : ""),
                colorFront2:        (item.colorAmountFront.value >= 2 ? item.colorFront2.value : ""),
                colorFront3:        (item.colorAmountFront.value >= 3 ? item.colorFront3.value : ""),
                colorFront4:        (item.colorAmountFront.value >= 4 ? item.colorFront4.value : ""),
                colorBack1:         (item.colorAmountBack.value >= 1 ? item.colorBack1.value : ""),
                colorBack2:         (item.colorAmountBack.value >= 2 ? item.colorBack2.value : ""),
                colorBack3:         (item.colorAmountBack.value >= 3 ? item.colorBack3.value : ""),
                colorBack4:         (item.colorAmountBack.value >= 4 ? item.colorBack4.value : ""),
                quantity:           item.quantity.value,
                unit:               item.unit.value,
                price:              item.price.value,
                workType:           item.workType.value,
                pattern:            item.pattern.value,
                emboss:             item.emboss.value,
                comment:            item.comment.value,
                sameBlock:          item.sameBlock,
                sameColor:          item.sameColor,
                vat:                addVAT ? 7 : 0,
                bagType:            "พลาสติก",
                design:             item.design.value,
            }
            order = [...order, data]
        })
        sentDataToBackEnd(order)
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
            <div className={styles["plastic-bag-order-form"]}>
                <center><h1>ใบสั่งพิมพ์ ORDER พลาสติก</h1></center>
                <div className={ContainerStyles["container"]}>
                    <NameForm nameForm={nameForm} setNameForm={setNameForm} menuValue={menuValue}/>
                    <PlasticBagOrder orderDetails={orderDetails} setOrderDetails={setOrderDetails} menuValue={menuValue} customerName={nameForm.name.value}/>
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

export default OpenPlasticBagOrderForm;
