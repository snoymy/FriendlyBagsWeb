import { Fragment, useState} from "react" 
import styles from "./PlasticBagOrderForm.module.css"
import BackEndInterface from "../../../../BackEndInterface"
import Modal from "../../modal/Modal"

const getOrderHistory = (name="", filter={bagType:"พลาสติก"}) => {
    console.log(name)
    let ret = []
    const item = BackEndInterface.getOrderHistory(name)

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

    return ret
}

const PlasticBagOrder = ({orderDetails, setOrderDetails, menuValue, customerName}) => {
    const [showModal, setShowModal] = useState(false)
    const [orderHistory, setOrderHistory] = useState(getOrderHistory(customerName))

    const removeOrder = (index) => {
        let tempOrderDetails = []

        orderDetails.map((item, index_map) => {
            if(index_map !== index){
                console.log("before", item)
                return tempOrderDetails = [...tempOrderDetails, item]
            }
        })
        console.log("after", tempOrderDetails)
        setOrderDetails(tempOrderDetails)
    }

    const onDetailChange = (value, index, prop, state=true) => {
        console.log(value)
        setOrderDetails(orderDetails.map(
                (subItem, subIndex) => {
                    if(index !== subIndex) return {...subItem}
                    return {...subItem, [prop]: {value:value, editable:state}}
                }
            )
        )
    }

    const onDetailChangeV2 = (value, index, prop) => {
        console.log(value)
        setOrderHistory(orderHistory.map(
                (subItem, subIndex) => {
                    if(index !== subIndex) return {...subItem}
                    return {...subItem, [prop]: value}
                }
            )
        )
    }

    const addNewOrder = () => {
        let newOrder = {
            workName: {value:menuValue.workName, editable:true},
            type: {value:menuValue.type[0], editable:true},
            bagSizeLength: {value:menuValue.bagSize.length, editable:true},
            bagSizeWidth: {value:menuValue.bagSize.width, editable:true},
            bagMat: {value:menuValue.bagMat[0], editable:true},
            bagMatColor: {value:menuValue.bagMatColor[0], editable:true},
            bagSide: {value:menuValue.bagSide.min, editable:true},
            plasticThickness: {value:menuValue.plasticThickness.min, editable:true},
            printFace: {value:menuValue.printFace.min, editable:true},
            colorAmountFront: {value:menuValue.colorAmount.min, editable:true},
            colorFront1: {value:menuValue.color[0], editable:false},
            colorFront2: {value:"", editable:false},
            colorFront3: {value:"", editable:false},
            colorFront4: {value:"", editable:false},
            colorAmountBack: {value:menuValue.colorAmount.min, editable:true},
            colorBack1: {value:menuValue.color[0], editable:false},
            colorBack2: {value:"", editable:false},
            colorBack3: {value:"", editable:false},
            colorBack4: {value:"", editable:false},
            quantity: {value:menuValue.quantity.min, editable:true},
            unit: {value:menuValue.unit[0], editable:true},
            price: {value:menuValue.price.min, editable:true},
            design: {value:menuValue.design, editable:true},
            workType: {value:menuValue.workType.sell, editable:true},
            pattern: {value:menuValue.pattern[0], editable:true},
            emboss: {value:menuValue.emboss, editable:true},
            comment: {value:menuValue.comment, editable:true},
            sameBlock: {value:menuValue.sameBlock, editable:true},
            sameColor: {value:menuValue.sameColor, editable:true},
        }

        setOrderDetails([...orderDetails, newOrder])
    }

    const addOrder = (order) => {
        let newOrder = {
            workName: {value:order.workName, editable:true},
            type: {value:order.type, editable:true},
            bagSize: {value:order.bagSize, editable:true},
            bagMat: {value:order.bagMat, editable:true},
            bagMatColor: {value:order.bagMatColor, editable:true},
            bagSide: {value:menuValue.bagSide.min, editable:true},
            plasticThickness: {value:order.plasticThickness, editable:true},
            printFace: {value:menuValue.printFace.min, editable:true},
            colorAmountFront: {value:order.colorAmount, editable:true},
            colorFront1: {value:order.color1, editable:false},
            colorFront2: {value:order.color2, editable:false},
            colorFront3: {value:order.color3, editable:false},
            colorFront4: {value:order.color4, editable:false},
            colorAmountBack: {value:order.colorAmount, editable:true},
            colorBack1: {value:order.color1, editable:false},
            colorBack2: {value:order.color2, editable:false},
            colorBack3: {value:order.color3, editable:false},
            colorBack4: {value:order.color4, editable:false},
            quantity: {value:order.quantity, editable:true},
            unit: {value:order.unit, editable:true},
            price: {value:order.price, editable:true},
            design: {value:menuValue.design, editable:true},
            workType: {value:order.workType, editable:true},
            pattern: {value:order.pattern, editable:true},
            emboss: {value:menuValue.emboss, editable:true},
            comment: {value:order.comment, editable:true},
            sameBlock: {value:order.sameBlock, editable:true},
            sameColor: {value:order.sameColor, editable:true}
        }

        setOrderDetails([...orderDetails, newOrder])
    }

    const clearItem = () => {
        setOrderDetails([])
    }

    const modalContent = (
        <div style={{padding: "30px"}}>
        <div className={styles["plastic-bag-order-table"]}>
            <table>
                <thead>
                    <tr>
                        <th><label style={{paddingLeft:"10px", paddingRight:"10px"}}>ลำดับที่</label></th>
                        <th><label>ชนิดถุง</label></th>
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
                        <th><label>แนบแบบ</label></th>
                        <th><label></label></th>
                    </tr>
                </thead>

                <tbody>
                    <tr><td><label>&nbsp;</label></td></tr>
                {orderHistory.map((item, index) => {
                    console.log("map", item)
                    return (
                        <Fragment key={index}>
                        <tr>
                            <td></td>
                            <td className={styles["plastic-bag-order-table-work-name"]} style={{textAlign:"left"}} colSpan={5}>
                                <label style={{width:"60%", textAlign:"left", fontSize:"25px"}}>ชื่องาน: {item.workName}</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label style={{paddingLeft:"10px", paddingRight:"10px"}}>{index+1}</label>
                            </td>
                            <td>
                                <label style={{width:"60%", textAlign:"left"}}>{item.type}</label>
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
                            <td>
                                <button className={styles["plastic-bag-order-add-button"]} type="button" style={{border:"none"}} onClick={()=>addOrder(item)}>+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label></label>
                            </td>
                            <td style={{paddingRight:"0", marginLeft:"100px"}} colSpan={3}>
                                <label>ประเภท: </label>
                                <label>{item.workType === "sell" ? "งานขาย" : "งานพิมพ์"}</label>
                                <label style={{paddingRight:"30px"}}>&nbsp;</label>
                            {
                                item.workType === "sell" && <label>ลาย: {item.pattern}</label>
                            }
                            </td>
                            <td>
                                <label>อัดลาย: </label>
                                <label>{item.emboss === true ? "อัด" : "ไม่อัด"}</label>
                            </td>
                            <td style={{}}>
                                <label>Comment:</label>
                            </td>
                            <td style={{textAlign:"left", verticalAlign: "top", border: "2px solid #e6e6e6", borderRadius: "5px"}} colSpan="4">
                                <label>{item.comment}</label>
                            </td>
                            <td style={{}} colSpan={3}>
                                <label style={{}}>
                                    Block เดิม
                                </label>
                                <input 
                                    style={{marginLeft:"-20px"}}
                                    type="checkbox" 
                                    name="sameBlock" 
                                    id="sameBlock" 
                                    onChange={(event) => onDetailChangeV2(event.target.checked, index, "sameBlock")}
                                />

                                <label style={{}}>
                                   สีเดิม
                                </label>
                                <input 
                                    style={{marginLeft:"-20px"}}
                                    type="checkbox" 
                                    name="sameColor" 
                                    id="sameColor" 
                                    onChange={(event) => onDetailChangeV2(event.target.checked, index, "sameColor")}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label></label>
                            </td>
                            <td colSpan="12"><hr/></td>
                            <td>
                                <label></label>
                            </td>
                        </tr>
                        </Fragment>
                    )
                })}
                </tbody>
            </table>
        </div>
        <div style={{textAlign:"right", marginRight:"30px", marginTop:"30px"}}>
            <button type="button" onClick={() => setShowModal(false)}>close</button>
        </div>
        </div>
    )
    
    console.log("history", orderHistory)

    return (
        <div className={styles["plastic-bag-order"]}>
        <div className={styles["plastic-bag-order-table"]}>
            <table>
                <thead>
                    <tr>
                        <th><label style={{paddingLeft:"10px", paddingRight:"10px"}}>ลำดับที่</label></th>
                        <th><label>ชนิดถุง</label></th>
                        <th style={{minWidth:"250px"}}><label>ขนาดถุง</label></th>
                        <th><label>เนื้อถุง</label></th>
                        <th><label>สีเนื้อถุง</label></th>
                        <th><label>ข้างถุง</label></th>
                        <th><label>ความหนาถุง</label></th>
                        <th><label>พิมพ์</label></th>
                        <th><label>จำนวนสีพิมพ์หน้า</label></th>
                        <th><label>หน้า</label></th>
                        <th><label>จำนวนสีพิมพ์หลัง</label></th>
                        <th><label>หลัง</label></th>
                        <th style={{minWidth:"200px"}}><label>จำนวน</label></th>
                        <th><label>ราคา</label></th>
                        <th><label>แนบแบบ</label></th>
                        <th><label></label></th>
                    </tr>
                </thead>

                <tbody>
                    <tr><td><label>&nbsp;</label></td></tr>
                {orderDetails.map((item, index) => {
                    if(item.sameColor.value === true){
                        item.colorAmountFront.editable = false
                        item.colorFront.editable = false
                        item.baseColorCheck.editable = false
                        item.baseColor.editable = false
                    }
                    if(item.sameBlock.value === true){
                        item.bagSize.editable = false
                        item.design.editable = false
                    }
                    return (
                        <Fragment key={index}>
                        <tr>
                            <td></td>
                            <td className={styles["plastic-bag-order-table-work-name"]} style={{textAlign:"left"}} colSpan={5}>
                                <input style={{width:"60%", textAlign:"left"}} type="text" name="workName" id="workName" value={item.workName.value} disabled={!item.workName.editable} placeholder="ระบุชื่องาน" onChange={(event) => onDetailChange(event.target.value, index, "workName")}/>
                            </td>
                        </tr>
                        <tr style={{height: "100px"}}>
                            <td>
                                <label style={{paddingLeft:"10px", paddingRight:"10px"}}>{index+1}</label>
                            </td>
                            <td>
                                <select name="type" id="type" value={item.type.value} disabled={!item.type.editable} onChange={(event) => onDetailChange(event.target.value, index, "type")}>
                                    {
                                        menuValue.type.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input style={{width:"20%"}} type="number" min={0} name="bagSizeLength" id="bagSizeLength" value={item.bagSizeLength.value} disabled={!item.bagSizeLength.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagSizeLength")}/>
                                <label>x</label>
                                <input style={{width:"20%"}} type="number" min={0} name="bagSizeWidth" id="bagSizeWidth" value={item.bagSizeWidth.value} disabled={!item.bagSizeWidth.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagSizeWidth")}/>
                                <label>นิ้ว</label>
                            </td>
                            <td>
                                <select name="bagMat" id="bagMat" value={item.bagMat.value} disabled={!item.bagMat.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagMat")}>
                                    {
                                        menuValue.bagMat.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="bagMatColor" id="bagMatColor" value={item.bagMatColor.value} disabled={!item.bagMatColor.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagMatColor")}>
                                    {
                                        menuValue.bagMatColor.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input style={{width:"40%"}}type="number" min={menuValue.bagSide.min} name="bagSide" id="bagSide" value={item.bagSide.value} disabled={!item.bagSide.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagSide")}/>
                                <label>นิ้ว</label>
                            </td>
                            <td>
                                <input style={{width:"30%"}}type="number" min={menuValue.plasticThickness.min} name="plasticThickness" id="plasticThickness" value={item.plasticThickness.value} disabled={!item.plasticThickness.editable} onChange={(event) => onDetailChange(event.target.value, index, "plasticThickness")}/>
                                <label>gram</label>
                            </td>
                            <td>
                                <input style={{width:"40%"}}type="number" min={menuValue.printFace.min} max={menuValue.printFace.max} name="printFace" id="printFace" value={item.printFace.value} disabled={!item.printFace.editable} onChange={(event) => onDetailChange(event.target.value, index, "printFace")}/>
                                <label>หน้า</label>
                            </td>
                            <td>
                                <input type="number" min={menuValue.colorAmount.min} max={menuValue.colorAmount.max} name="colorAmountFront" id="colorAmountFront" value={item.colorAmountFront.value} disabled={!item.colorAmountFront.editable} onChange={(event) => onDetailChange(event.target.value, index, "colorAmountFront")}/>
                            </td>
                            <td>
                                <div style={{whiteSpace:"nowrap", width:"130px", overflowX:"auto"}}>
                                    { 
                                        (item.colorFront1.editable = item.colorAmountFront.value >= 1 && item.colorAmountFront.editable)
                                    }
                                        <input list="colorFront" name="colorFront" value={item.colorAmountFront.value >= 1 ? item.colorFront1.value : ""} disabled={!item.colorFront1.editable} placeholder="ระบุสี1" onChange={(event) => onDetailChange(event.target.value, index, "colorFront1")}/>
                                        <datalist id="colorFront">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                    { 
                                        (item.colorFront2.editable = item.colorAmountFront.value >= 2 && item.colorAmountFront.editable) &&
                                        <>
                                        <input list="colorFront" name="colorFront" value={item.colorAmountFront.value >= 2 ? item.colorFront2.value : ""} disabled={!item.colorFront2.editable} placeholder="ระบุสี2" onChange={(event) => onDetailChange(event.target.value, index, "colorFront2")}/>
                                        <datalist id="colorFront">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                        </>
                                    }
                                    { 
                                        (item.colorFront3.editable = item.colorAmountFront.value >= 3 && item.colorAmountFront.editable) &&
                                        <>
                                        <input list="colorFront" name="colorFront" value={item.colorAmountFront.value >= 3 ? item.colorFront3.value : ""} disabled={!item.colorFront3.editable} placeholder="ระบุสี3" onChange={(event) => onDetailChange(event.target.value, index, "colorFront3")}/>
                                        <datalist id="colorFront">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                        </>
                                    }
                                    { 
                                        (item.colorFront4.editable = item.colorAmountFront.value >= 4 && item.colorAmountFront.editable) &&
                                        <>
                                        <input list="colorFront" name="colorFront" value={item.colorAmountFront.value >= 4 ? item.colorFront4.value : ""} disabled={!item.colorFront4.editable} placeholder="ระบุสี4" onChange={(event) => onDetailChange(event.target.value, index, "colorFront4")}/>
                                        <datalist id="colorFront">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                        </>
                                    }
                                </div>
                            </td>
                            <td>
                                <input type="number" min={menuValue.colorAmount.min} max={menuValue.colorAmount.max} name="colorAmountBack" id="colorAmountBack" value={item.colorAmountBack.value} disabled={!item.colorAmountBack.editable} onChange={(event) => onDetailChange(event.target.value, index, "colorAmountBack")}/>
                            </td>
                            <td>
                                <div style={{whiteSpace:"nowrap", width:"130px", overflowX:"auto"}}>
                                    { 
                                        (item.colorBack1.editable = item.colorAmountBack.value >= 1 && item.colorAmountBack.editable)
                                    }
                                        <input list="colorBack" name="colorBack" value={item.colorAmountBack.value >= 1 ? item.colorBack1.value : ""} disabled={!item.colorBack1.editable} placeholder="ระบุสี1" onChange={(event) => onDetailChange(event.target.value, index, "colorBack1")}/>
                                        <datalist id="colorBack">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                    { 
                                        (item.colorBack2.editable = item.colorAmountBack.value >= 2 && item.colorAmountBack.editable) &&
                                        <>
                                        <input list="colorBack" name="colorBack" value={item.colorAmountBack.value >= 2 ? item.colorBack2.value : ""} disabled={!item.colorBack2.editable} placeholder="ระบุสี2" onChange={(event) => onDetailChange(event.target.value, index, "colorBack2")}/>
                                        <datalist id="colorBack">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                        </>
                                    }
                                    { 
                                        (item.colorBack3.editable = item.colorAmountBack.value >= 3 && item.colorAmountBack.editable) &&
                                        <>
                                        <input list="colorBack" name="colorBack" value={item.colorAmountBack.value >= 3 ? item.colorBack3.value : ""} disabled={!item.colorBack3.editable} placeholder="ระบุสี3" onChange={(event) => onDetailChange(event.target.value, index, "colorBack3")}/>
                                        <datalist id="colorBack">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                        </>
                                    }
                                    { 
                                        (item.colorBack4.editable = item.colorAmountBack.value >= 4 && item.colorAmountBack.editable) &&
                                        <>
                                        <input list="colorBack" name="colorBack" value={item.colorAmountBack.value >= 4 ? item.colorBack4.value : ""} disabled={!item.colorBack4.editable} placeholder="ระบุสี4" onChange={(event) => onDetailChange(event.target.value, index, "colorBack4")}/>
                                        <datalist id="colorBack">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                        </>
                                    }
                                </div>
                            </td>
                            <td>
                                <input style={{width: "50px"}}type="number" min={menuValue.quantity.min} name="quantity" id="quantity" value={item.quantity.value} disabled={!item.quantity.editable} onChange={(event) => onDetailChange(event.target.value, index, "quantity")}/>
                                <select style={{width: "70px"}}name="unit" id="unit" value={item.unit.value} disabled={!item.unit.editable} onChange={(event) => onDetailChange(event.target.value, index, "unit")}>
                                    {
                                        menuValue.unit.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input type="number" min={menuValue.price.min} name="price" id="price" value={item.price.value} disabled={!item.price.editable} onChange={(event) => onDetailChange(event.target.value, index, "price")}/>
                            </td>
                            <td>
                                <input type="file" id="file-upload" style={{display:"none"}}/>
                                <button type="button" disabled={!item.design.editable} onClick={()=>document.getElementById("file-upload").click()}>Upload</button>
                            </td>
                            <td>
                                <button className={styles["plastic-bag-order-table-delete-button"]} type="button" style={{border:"none"}} onClick={()=>removeOrder(index)}>X</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label></label>
                            </td>
                            <td style={{textAlign:"right", paddingRight:"0"}}>
                                <label>งานขาย</label>
                                <br/>
                                <label>งานพิมพ์</label>
                            </td>
                            <td style={{textAlign:"left", paddingLeft:"0"}} colSpan={2}>
                                <input type="radio" name={"workType"+index} id="workType" checked={item.workType.value === menuValue.workType.sell?"checked":""} value={menuValue.workType.sell} disabled={!item.workType.editable} onChange={(event) => onDetailChange(event.target.value, index, "workType")}/>
                                <br/>
                                <input type="radio" name={"workType"+index} id="workType" checked={item.workType.value === menuValue.workType.print?"checked":""} value={menuValue.workType.print} disabled={!item.workType.editable} onChange={(event) => onDetailChange(event.currentTarget.value, index, "workType")}/>
                            {
                                item.pattern.editable = item.workType.value === "print"? false:true
                            }
                                <select style={{width: "70px", top: "25px", left: "-70px"}} name="pattern" id="pattern" value={item.pattern.value} disabled={!item.pattern.editable} onChange={(event) => onDetailChange(event.target.value, index, "pattern")}>
                                    {
                                        menuValue.pattern.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label style={{marginLeft:"30px"}}>อัดลาย</label>
                                <input type="checkbox" name="emboss" id="emboss" checked={item.emboss.value} disabled={!item.emboss.editable} onChange={(event) => {
                                    onDetailChange(event.target.checked, index, "emboss")
                                }
                                    }
                                />
                            </td>
                            <td style={{}}>
                                <label>Comment:</label>
                            </td>
                            <td style={{textAlign:"left", verticalAlign: "top"}} colSpan="4">
                                <textarea style={{width:"100%", height:"70px"}} value={item.comment.value} disabled={!item.comment.editable} onChange={(event) => onDetailChange(event.target.value, index, "comment")}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label></label>
                            </td>
                            <td colSpan="12"><hr/></td>
                            <td>
                                <label></label>
                            </td>
                        </tr>
                        </Fragment>
                    )
                })}
                </tbody>

            </table>
        </div>
        <button className={styles["plastic-bag-order-add-order-button"]} type="button" onClick={addNewOrder}>+Add Order</button>
        <button type="button" onClick={() => {setOrderHistory(getOrderHistory(customerName));setShowModal(true)}}>Order history</button>
        <button className={styles["plastic-bag-order-clear-button"]} type="button" onClick={clearItem}>Clear All Order</button>
        <Modal style={{width:"1700px"}} content={modalContent} showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}
export default PlasticBagOrder;
