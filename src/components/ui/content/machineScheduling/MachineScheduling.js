import { Fragment, useState, useEffect} from "react" 
import styles from "./MachineScheduling.module.css"
import containerStyles from "./container.module.css" 
import BackEndInterface from "../../../../BackEndInterface"
import Modal from "../../modal/Modal"

const sentDataToBackEnd = (order) => {
    BackEndInterface.sentEditedOrder(order)
}

const MachineScheduling = ({filter})=>{
    const [machineScheduling, setMachineScheduling] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [viewIndex, setViewIndex] = useState(0)
    const [showBagType, setShowBagType] = useState("กระดาษ")
    const [mc, setmc] = useState(1)

    const onDetailChange = (value, index, prop) => {
        console.log(value)
        setMachineScheduling(machineScheduling.map(
                (subItem, subIndex) => {
                    if(index !== subIndex) return {...subItem}
                    return {...subItem, [prop]: value}
                }
            )
        )
    }

    useEffect(()=>{
        getMachineScheduling(mc)
    }, [])

    const getMachineScheduling = async (mc) => {
        let ret = []
        const item = await BackEndInterface.getMC(mc)

        if(!(Object.keys(filter).length === 0 && filter.constructor === Object)){
            item.map((subItem, subIndex)=>{
                if(filter.bagType !== undefined ? subItem.bagType === filter.bagType : true){
                    console.log(subItem)
                    ret = [...ret, subItem]
                }
            })
        }
        else{
            ret = item
        }
        setMachineScheduling(ret)
    }

    const packDataAndSent = () => {
        sentDataToBackEnd(machineScheduling)
        alert("Success")
        //window.location.reload();
    }
    
    const modalContentPaper = (
        <div style={{padding: "30px"}}>
            <div className={styles["check-artwork-table"]} style={{paddingBottom:"50px"}}>
            <table>
                <thead>
                    <tr>
                        <th><label>ชนิดถุง</label></th>
                        <th><label>งาน</label></th>
                        <th><label>อัดลาย</label></th>
                        <th><label>ชนิดกระดาษ</label></th>
                        <th><label>ความหนากระดาษ</label></th>
                        <th><label>ขนาดถุง</label></th>
                        <th><label>ทรง</label></th>
                        <th><label>หูถุง</label></th>
                        <th><label>จำนวนสีพิมพ์</label></th>
                        <th><label>สี</label></th>
                        <th><label>ย้อมพื้น</label></th>
                        <th><label>สีย้อม</label></th>
                        <th><label>จำนวน</label></th>
                        <th><label>ราคา</label></th>
                        <th><label>แบบ</label></th>
                    </tr>
                </thead>

                <tbody>
                    <tr><td><label>&nbsp;</label></td></tr>
                {machineScheduling.map((item, index) => {
                    console.log("map", item)
                    if(index === viewIndex && item.color !== undefined){
                    return (
                        <Fragment key={index}>
                        <tr>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagType}</label>
                            </td>
                            <td>
                                <label>{item.workType === "sell" ? "งานขาย" : "งานพิมพ์"}</label>
                            </td>
                            <td>
                            {
                                item.workType === "sell" ? <label>{item.pattern}</label> : <label>-</label>
                            }
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.paperType}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.paperThickness} gram</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagSize}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagShape}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagEars}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.colorAmount}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.colorAmount !== 0 ? item.color.filter(n => n).join() : "-"}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.baseColorCheck ? "ย้อม" : "ไม่ย้อม"}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.baseColorCheck ? item.baseColor : "-"}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.quantity} {item.unit}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.price}</label>
                            </td>
                            <td>
                                <input type="button" id="file-upload" style={{display:"none"}}/>
                                <button type="button" onClick={()=>document.getElementById("file-upload").click()}>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{}}>
                                <label>Comment:</label>
                            </td>
                            <td style={{textAlign:"left", verticalAlign: "top", border: "2px solid #e6e6e6", borderRadius: "5px"}} colSpan="4">
                                <label>{item.comment}</label>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left", paddingTop:"50px"}} colSpan={3}>
                                <label style={{width:"60%", marginLeft:"10px"}}>ราคารวม </label> {item.vat !== 0 && <label>(vat {item.vat}%) </label>}
                                <label>:&nbsp;&nbsp;&nbsp;</label>
                                <div style={{display:"inline-block", padding: "0 5px", width: "70px", textAlign: "right", border: "2px solid #d7d7d7", borderRadius:"5px"}}>
                                    <label>{item.quantity * item.price + ( (item.vat/100) * (item.quantity*item.price) )}</label>
                                </div>
                                <label>&nbsp;Baht</label>
                            </td>
                        </tr>
                        </Fragment>
                    )
                    }
                })}
                </tbody>
            </table>
        </div>
        <div style={{textAlign:"right", marginRight:"30px"}}>
            <button type="button" onClick={() => setShowModal(false)}>close</button>
        </div>
        </div>
    )

    const modalContentPlastic = (
        <div style={{padding: "30px"}}>
            <div className={styles["check-artwork-table"]} style={{paddingBottom:"50px"}}>
            <table>
                <thead>
                    <tr>
                        <th><label>ชนิดถุง</label></th>
                        <th><label>ประเภท</label></th>
                        <th><label>งาน</label></th>
                        <th><label>อัดลาย</label></th>
                        <th><label>ขนาดถุง</label></th>
                        <th><label>เนื้อถุง</label></th>
                        <th><label>สีเนื้อถุง</label></th>
                        <th><label>ข้างถุง</label></th>
                        <th><label>ความหนาถุง</label></th>
                        <th><label>พิมพ์</label></th>
                        <th><label>จำนวนสีพิมพ์หน้า</label></th>
                        <th><label>หน้า</label></th>
                        <th><label>จำนวนสีพิมพ์หลัง</label></th>
                        <th><label>หลัง</label></th>
                        <th style={{width:"200px"}}><label>จำนวน</label></th>
                        <th><label>ราคา</label></th>
                        <th><label>แบบ</label></th>
                    </tr>
                </thead>

                <tbody>
                    <tr><td><label>&nbsp;</label></td></tr>
                {machineScheduling.map((item, index) => {
                    if(index === viewIndex && item.colorFront !== undefined && item.colorBack !== undefined)
                    return (
                        <Fragment key={index}>
                        <tr>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagType}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.type}</label>
                            </td>
                            <td>
                                <label>{item.workType === "sell" ? "งานขาย" : "งานพิมพ์"}</label>
                            </td>
                            <td>
                                <label>{item.emboss === true ? "อัด" : "ไม่อัด"}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagSize.length}x{item.bagSize.width} นิ้ว</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagMat}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagMatColor}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.bagSide} นิ้ว</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.plasticThickness} gram</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.printFace}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.colorAmountFront}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.colorAmountFront !== 0 ? item.colorFront.filter(n => n).join() : "-"}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.colorAmountBack}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.colorAmountBack !== 0 ? item.colorBack.filter(n => n).join() : "-"}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.quantity} {item.unit}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.price}</label>
                            </td>
                            <td>
                                <input type="button" id="file-upload" style={{display:"none"}}/>
                                <button type="button" onClick={()=>document.getElementById("file-upload").click()}>View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label></label>
                            </td>
                        </tr>
                        <tr>
                            <td style={{}}>
                                <label>Comment:</label>
                            </td>
                            <td style={{textAlign:"left", verticalAlign: "top", border: "2px solid #e6e6e6", borderRadius: "5px"}} colSpan="4">
                                <label>{item.comment}</label>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"left", paddingTop:"50px"}} colSpan={3}>
                                <label style={{width:"60%", marginLeft:"10px"}}>ราคารวม </label> {item.vat !== 0 && <label>(vat {item.vat}%) </label>}
                                <label>:&nbsp;&nbsp;&nbsp;</label>
                                <div style={{display:"inline-block", padding: "0 5px", width: "70px", textAlign: "right", border: "2px solid #d7d7d7", borderRadius:"5px"}}>
                                    <label>{item.quantity * item.price + ( (item.vat/100) * (item.quantity*item.price) )}</label>
                                </div>
                                <label>&nbsp;Baht</label>
                            </td>
                        </tr>
                        </Fragment>
                    )
                })}
                </tbody>
            </table>
        </div>
        <div style={{textAlign:"right", marginRight:"30px"}}>
            <button type="button" onClick={() => setShowModal(false)}>close</button>
        </div>
        </div>
    )

    const modalContent = (showBagType) => {
        if(showBagType === "กระดาษ"){
            return modalContentPaper
        }
        else if(showBagType === "พลาสติก"){
            return modalContentPlastic
        }
    }

    return (
        <div className={containerStyles["container"]} style={{padding: "30px"}}>
        <div className={styles["check-artwork"]}>
        <select style={{width: "100px", top: "25px", left: "-70px"}} name="status" id="status" value={mc} onChange={(event)=>setmc(event.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
        </select>
            <div className={styles["check-artwork-table"]}>
                <table>
                    <thead>
                        <tr>
                            {/*}<th><label style={{paddingLeft:"10px", paddingRight:"10px"}}>ลำดับที่</label></th>{*/}
                            <th style={{width:"150px"}} rowSpan="2"><label>ชื่องาน</label></th>
                            <th style={{width:"150px"}} colSpan="4"><label>ขนาด</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>เนื้อถุง</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>สีถุง</label></th>
                            <th style={{width:"150px"}} rowSpan="2" colSpan="4"><label>สีพิมพ์</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>แบบ</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>จำนวน</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>หน่วย</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>เวลาที่ใช้(นาที)</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>เวลาเริ่ม</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>เวลาจบ</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>ช่างเป่า/พิมพ์</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>ช่างตัด</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>QC</label></th>
                            <th style={{width:"150px"}} rowSpan="2"><label>หัวหน้างาน</label></th>
                        </tr>
                        <tr>
                            {/*}<th><label style={{paddingLeft:"10px", paddingRight:"10px"}}>ลำดับที่</label></th>{*/}
                            <th style={{width:"150px"}}><label>กว้าง</label></th>
                            <th style={{width:"150px"}}><label>ยาว</label></th>
                            <th style={{width:"150px"}}><label>จีบ</label></th>
                            <th style={{width:"150px"}}><label>หนา</label></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td><label>&nbsp;</label></td></tr>
                    {machineScheduling.map((item, index) => {
                        console.log("map", item)
                        return (
                            <Fragment key={index}>
                            <tr>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.name}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.width}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.height}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.plasticThickness}</label>
                                </td>

                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.bagMat}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.bagMatColor}</label>
                                </td>

                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}><b>หน้า</b></label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.colorFront}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:"", }}><b>หลัง</b></label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.colorBack}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.design}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.quantity}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.unit}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.useTime}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.startTime}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.endTime}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.print}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.cut}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.qc}</label>
                                </td>
                                <td>
                                    <label style={{paddingLeft:"10px", paddingRight:"10px", width:""}}>{item.leader}</label>
                                </td>
                            </tr>
                            </Fragment>
                        )
                    })}
                    </tbody>
                </table>
            <Modal style={{width:"92%"}} content={modalContent(showBagType)} showModal={showModal} setShowModal={setShowModal}/>
            </div>
            <button type="button" onClick={packDataAndSent}>Submit</button>
        </div>
        </div>
       
    )
}

export default MachineScheduling;
