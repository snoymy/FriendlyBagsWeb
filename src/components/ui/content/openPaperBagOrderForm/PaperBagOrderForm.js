import { Fragment, useState, useEffect} from "react" 
import styles from "./PaperBagOrderForm.module.css"
import BackEndInterface from "../../../../BackEndInterface"
import Modal from "../../modal/Modal"

const PaperBagOrder = ({orderDetails, setOrderDetails, menuValue, customerName}) => {
    const [showModal, setShowModal] = useState(false)
    const [orderHistory, setOrderHistory] = useState([])

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

    useEffect(()=>{
        getOrderHistory(customerName)
    }, [])

    const getOrderHistory = async (name="*", filter={bagType:"กระดาษ"}) => {
        console.log(name)
        let ret = []
        const item = await BackEndInterface.getOrderHistory(name)

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
        setOrderHistory(ret)
    }

    const addNewOrder = () => {
        let newOrder = {
            workName: {value:menuValue.workName, editable:true},
            paperType: {value:menuValue.paperType[0], editable:true},
            paperThickness: {value:menuValue.paperThickness[0], editable:true},
            bagSize: {value:menuValue.bagSize[0], editable:true},
            bagShape: {value:menuValue.bagShape[0], editable:true},
            bagEars: {value:menuValue.bagEars[0], editable:true},
            colorAmount: {value:menuValue.colorAmount.min, editable:true},
            color1: {value:menuValue.color[0], editable:false},
            color2: {value:"", editable:false},
            color3: {value:"", editable:false},
            color4: {value:"", editable:false},
            baseColorCheck: {value:menuValue.baseColorCheck, editable:true},
            baseColor: {value:menuValue.baseColor[0], editable:false},
            quantity: {value:menuValue.quantity.min, editable:true},
            unit: {value:menuValue.unit[0], editable:true},
            price: {value:menuValue.price.min, editable:true},
            design: {value:menuValue.design, editable:true},
            workType: {value:menuValue.workType.sell, editable:true},
            pattern: {value:menuValue.pattern[0], editable:true},
            comment: {value:menuValue.comment, editable:true},
            sameBlock: {value:menuValue.sameBlock, editable:true},
            sameColor: {value:menuValue.sameColor, editable:true},
        }

        setOrderDetails([...orderDetails, newOrder])
    }

    const addOrder = (order) => {
        let newOrder = {
            workName: {value:order.workName, editable:true},
            paperType: {value:order.paperType, editable:true},
            paperThickness: {value:order.paperThickness, editable:true},
            bagSize: {value:order.bagSize, editable:true},
            bagShape: {value:order.bagShape, editable:true},
            bagEars: {value:order.bagEars, editable:true},
            colorAmount: {value:order.colorAmount, editable:true},
            color1: {value:order.color1, editable:false},
            color2: {value:order.color2, editable:false},
            color3: {value:order.color3, editable:false},
            color4: {value:order.color4, editable:false},
            baseColorCheck: {value:order.baseColorCheck, editable:true},
            baseColor: {value:order.baseColor, editable:false},
            quantity: {value:order.quantity, editable:true},
            unit: {value:order.unit, editable:true},
            price: {value:order.price, editable:true},
            design: {value:menuValue.design, editable:true},
            workType: {value:order.workType, editable:true},
            pattern: {value:order.pattern, editable:true},
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
        <div className={styles["paper-bag-order-table"]}>
            <table>
                <thead>
                    <tr>
                        <th><label style={{paddingLeft:"10px", paddingRight:"10px"}}>ลำดับที่</label></th>
                        <th><label>ชนิดกระดาษ</label></th>
                        <th><label>ความหนากระดาษ</label></th>
                        <th><label>ขนาดถุง</label></th>
                        <th><label>ทรง</label></th>
                        <th><label>หูถุง</label></th>
                        <th><label>จำนวนสีพิมพ์</label></th>
                        <th><label>สี</label></th>
                        <th><label>ย้อมพื้น</label></th>
                        <th><label>สีย้อม</label></th>
                        <th style={{width:"200px"}}><label>จำนวน</label></th>
                        <th><label>ราคา</label></th>
                        <th><label>แบบ</label></th>
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
                            <td className={styles["paper-bag-order-table-work-name"]} style={{textAlign:"left"}} colSpan={5}>
                                <label style={{width:"60%", textAlign:"left", fontSize:"25px"}}>ชื่องาน: {item.workName}</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label style={{paddingLeft:"10px", paddingRight:"10px"}}>{index+1}</label>
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
                            <td>
                                <button className={styles["paper-bag-order-add-button"]} type="button" style={{border:"none"}} onClick={()=>addOrder(item)}>+</button>
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
                            <td style={{}}>
                                <label>Comment:</label>
                            </td>
                            <td style={{textAlign:"left", verticalAlign: "top", border: "2px solid #e6e6e6", borderRadius: "5px"}} colSpan="4">
                                <label>{item.comment}</label>
                            </td>
                            <td style={{}} colSpan={2}>
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
        <div className={styles["paper-bag-order"]}>
        <div className={styles["paper-bag-order-table"]}>
            <table>
                <thead>
                    <tr>
                        <th><label style={{paddingLeft:"10px", paddingRight:"10px"}}>ลำดับที่</label></th>
                        <th><label>ชนิดกระดาษ</label></th>
                        <th><label>ความหนากระดาษ</label></th>
                        <th><label>ขนาดถุง</label></th>
                        <th><label>ทรง</label></th>
                        <th><label>หูถุง</label></th>
                        <th><label>จำนวนสีพิมพ์</label></th>
                        <th><label>สี</label></th>
                        <th><label>ย้อมพื้น</label></th>
                        <th><label>สีย้อม</label></th>
                        <th style={{width:"200px"}}><label>จำนวน</label></th>
                        <th><label>ราคา</label></th>
                        <th><label>แนบแบบ</label></th>
                        <th><label></label></th>
                    </tr>
                </thead>

                <tbody>
                    <tr><td><label>&nbsp;</label></td></tr>
                {orderDetails.map((item, index) => {
                    console.log("map", item)
                    console.log("sc", item.sameColor.value)
                    console.log("sb", item.sameBlock.value)
                    if(item.sameColor.value === true){
                        item.colorAmount.editable = false
                        item.color.editable = false
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
                            <td className={styles["paper-bag-order-table-work-name"]} style={{textAlign:"left"}} colSpan={5}>
                                <input style={{width:"60%", textAlign:"left"}} type="text" name="workName" id="workName" value={item.workName.value} disabled={!item.workName.editable} placeholder="ระบุชื่องาน" onChange={(event) => onDetailChange(event.target.value, index, "workName")}/>
                            </td>
                        </tr>
                        <tr style={{height: "100px"}}>
                            <td>
                                <label style={{paddingLeft:"10px", paddingRight:"10px"}}>{index+1}</label>
                            </td>
                            <td>
                                <select name="paperType" id="paperType" value={item.paperType.value} disabled={!item.paperType.editable} onChange={(event) => onDetailChange(event.target.value, index, "paperType")}>
                                    {
                                        menuValue.paperType.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select style={{width:"50%"}}name="paperThickness" id="paperThickness" value={item.paperThickness.value} disabled={!item.paperThickness.editable} onChange={(event) => onDetailChange(event.target.value, index, "paperThickness")}>
                                    {
                                        menuValue.paperThickness.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label>gram</label>
                            </td>
                            <td>
                                <select name="bagSize" id="bagSize" value={item.bagSize.value} disabled={!item.bagSize.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagSize")}>
                                    {
                                        menuValue.bagSize.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="bagShape" id="bagShape" value={item.bagShape.value} disabled={!item.bagShape.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagShape")}>
                                    {
                                        menuValue.bagShape.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="bagEars" id="bagEars" value={item.bagEars.value} disabled={!item.bagEars.editable} onChange={(event) => onDetailChange(event.target.value, index, "bagEars")}>
                                    {
                                        menuValue.bagEars.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input type="number" min={menuValue.colorAmount.min} max={menuValue.colorAmount.max} name="colorAmount" id="colorAmount" value={item.colorAmount.value} disabled={!item.colorAmount.editable} onChange={(event) => onDetailChange(event.target.value, index, "colorAmount")}/>
                            </td>
                            <td>
                                <div style={{whiteSpace:"nowrap", width:"130px", overflowX:"auto"}}>
                                    { 
                                        (item.color1.editable = item.colorAmount.value >= 1 && item.colorAmount.editable)
                                    }
                                        <input list="color" name="color" value={item.colorAmount.value >= 1 ? item.color1.value : ""} disabled={!item.color1.editable} placeholder="ระบุสี1" onChange={(event) => onDetailChange(event.target.value, index, "color1")}/>
                                        <datalist id="color">
                                        {
                                            menuValue.color.map((menuItem, subIndex) => {
                                                return (
                                                    <option key={subIndex} value={menuItem}/>
                                                )
                                            })
                                        }
                                        </datalist>
                                    { 
                                        (item.color2.editable = item.colorAmount.value >= 2 && item.colorAmount.editable) &&
                                        <>
                                        <input list="color" name="color" value={item.colorAmount.value >= 2 ? item.color2.value : ""} disabled={!item.color2.editable} placeholder="ระบุสี2" onChange={(event) => onDetailChange(event.target.value, index, "color2")}/>
                                        <datalist id="color">
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
                                        (item.color3.editable = item.colorAmount.value >= 3 && item.colorAmount.editable) &&
                                        <>
                                        <input list="color" name="color" value={item.colorAmount.value >= 3 ? item.color3.value : ""} disabled={!item.color3.editable} placeholder="ระบุสี3" onChange={(event) => onDetailChange(event.target.value, index, "color3")}/>
                                        <datalist id="color">
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
                                        (item.color4.editable = item.colorAmount.value >= 4 && item.colorAmount.editable) &&
                                        <>
                                        <input list="color" name="color" value={item.colorAmount.value >= 4 ? item.color4.value : ""} disabled={!item.color4.editable} placeholder="ระบุสี4" onChange={(event) => onDetailChange(event.target.value, index, "color4")}/>
                                        <datalist id="color">
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
                                <input type="checkbox" name="baseColorCheck" id="baseColorCheck" checked={item.baseColorCheck.value} disabled={!item.baseColorCheck.editable} onChange={(event) => {
                                onDetailChange(event.target.checked, index, "baseColorCheck")
                                }
                            }
                            />
                            </td>
                            {
                                item.baseColor.editable = item.baseColorCheck.value && item.baseColorCheck.editable
                            }
                            <td>
                                <input list="baseColor" name="baseColor" value={item.baseColorCheck.value ? item.baseColor.value : ""} disabled={!item.baseColor.editable} placeholder="ระบุสี" onChange={(event) => onDetailChange(event.target.value, index, "baseColor")}/>
                                    <datalist id="baseColor">
                                    {
                                        menuValue.baseColor.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}/>
                                            )
                                        })
                                    }
                                  </datalist>
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
                                <button className={styles["paper-bag-order-table-delete-button"]} type="button" style={{border:"none"}} onClick={()=>removeOrder(index)}>X</button>
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
        <button className={styles["paper-bag-order-add-order-button"]} type="button" onClick={addNewOrder}>+Add Order</button>
        <button type="button" onClick={() => {setOrderHistory(getOrderHistory(customerName));setShowModal(true)}}>Order history</button>
        <button className={styles["paper-bag-order-clear-button"]} type="button" onClick={clearItem}>Clear All Order</button>
        <Modal style={{width:"1700px"}} content={modalContent} showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}
export default PaperBagOrder;
