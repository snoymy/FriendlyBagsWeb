import { Fragment } from "react" 
import styles from "./PaperBagOrderForm.module.css"

const PaperBagOrder = ({orderDetails, setOrderDetails, menuValue}) => {
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

    return (
        <div className={styles["paper-bag-order"]}>
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
                        <th><label>จำนวน</label></th>
                        <th><label>ราคา</label></th>
                        <th><label>แนบแบบ</label></th>
                        <th><label></label></th>
                    </tr>
                </thead>

                <tbody>
                    <tr><td><label>&nbsp;</label></td></tr>
                {orderDetails.map((item, index) => {
                    console.log("map", item)
                    return (
                        <Fragment key={index}>
                        <tr>
                            <td></td>
                            <td className={styles["paper-bag-order-work-name"]} style={{textAlign:"left"}} colSpan={5}>
                                <input style={{width:"60%", textAlign:"left"}} type="text" placeholder="ระบุชื่องาน"/>
                            </td>
                        </tr>
                        <tr>
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
                                <lable>gram</lable>
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
                                <select name="shape" id="shape" value={item.shape.value} disabled={!item.shape.editable} onChange={(event) => onDetailChange(event.target.value, index, "shape")}>
                                    {
                                        menuValue.shape.map((menuItem, subIndex) => {
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
                            {
                                item.color.editable = item.colorAmount.value == 0? false:true
                            }
                            <td>
                                <input list="color" name="color" disabled={!item.color.editable} placeholder="ระบุสี" onChange={(event) => onDetailChange(event.target.value, index, "color")}/>
                                <datalist id="color">
                                {
                                    menuValue.color.map((menuItem, subIndex) => {
                                        return (
                                            <option key={subIndex} value={menuItem}/>
                                        )
                                    })
                                }
                                </datalist>
                            </td>
                            <td>
                                <input type="checkbox" name="baseColorCheck" id="baseColorCheck" value={item.baseColorCheck.value} disabled={!item.baseColorCheck.editable} onChange={(event) => {
                                onDetailChange(event.target.checked, index, "baseColorCheck")
                                onDetailChange(item.baseColor, index, "baseColor", event.target.checked)
                                }
                            }
                            />
                            </td>
                            <td>
                                    <input list="baseColor" name="baseColor" disabled={!item.baseColor.editable} placeholder="ระบุสี" onChange={(event) => onDetailChange(event.target.value, index, "baseColor")}/>
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
                                <button type="button" onClick={()=>document.getElementById("file-upload").click()}>Upload</button>
                            </td>
                            <td>
                                <button className={styles["paper-bag-order-delete-button"]} type="button" style={{border:"none"}} onClick={()=>removeOrder(index)}>X</button>
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
                            <td style={{textAlign:"left", paddingLeft:"0"}}>
                                <input type="radio" name={"workType"+index} id="workType" checked={item.workType.value === menuValue.workType.sell?"checked":""} value={menuValue.workType.sell} disabled={!item.workType.editable} onChange={(event) => onDetailChange(event.target.value, index, "workType")}/>
                                <br/>
                                <input type="radio" name={"workType"+index} id="workType" checked={item.workType.value === menuValue.workType.print?"checked":""} value={menuValue.workType.print} disabled={!item.workType.editable} onChange={(event) => onDetailChange(event.currentTarget.value, index, "workType")}/>
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
                            <td colSpan="11"><hr/></td>
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
    )
}
export default PaperBagOrder;
