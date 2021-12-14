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

    const onDetailChange = (value, index, prop) => {
        console.log(value)
        setOrderDetails(orderDetails.map(
                (subItem, subIndex) => {
                    if(index !== subIndex) return {...subItem}
                    return {...subItem, [prop]: {value:value, editable:true}}
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
                        <th><label>ความหน้ากระดาษ</label></th>
                        <th><label>ขนาดถุง</label></th>
                        <th><label>ทรง</label></th>
                        <th><label>หูถุง</label></th>
                        <th><label>จำนวนสีพิมพ์</label></th>
                        <th><label>ย้อมพื้น</label></th>
                        <th><label>สี</label></th>
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
                                <select name="paperThickness" id="paperThickness" value={item.paperThickness.value} disabled={!item.paperThickness.editable} onChange={(event) => onDetailChange(event.target.value, index, "paperThickness")}>
                                    {
                                        menuValue.paperThickness.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
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
                                <input type="number" min={0} name="colorAmount" id="colorAmount" value={item.colorAmount.value} disabled={!item.colorAmount.editable} onChange={(event) => onDetailChange(event.target.value, index, "colorAmount")}/>
                            </td>
                            <td>
                                <input type="checkbox" name="baseColor" id="baseColor" value={item.baseColor.value} disabled={!item.baseColor.editable} onChange={(event) => onDetailChange(event.target.checked, index, "baseColor")}/>
                            </td>
                            <td>
                                <select name="color" id="" value={item.color.value} disabled={!item.color.editable} onChange={(event) => onDetailChange(event.target.value, index, "color")}>
                                    {
                                        menuValue.color.map((menuItem, subIndex) => {
                                            return (
                                                <option key={subIndex} value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input type="number" min={0} name="quantity" id="quantity" value={item.quantity.value} disabled={!item.quantity.editable} onChange={(event) => onDetailChange(event.target.value, index, "quantity")}/>
                            </td>
                            <td>
                                <input type="number" min={0} name="price" id="price" value={item.price.value} disabled={!item.price.editable} onChange={(event) => onDetailChange(event.target.value, index, "price")}/>
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
                            </td>
                            <td style={{textAlign:"left", paddingLeft:"0"}}>
                                <input type="radio" name={"workType"+index} id="workType" checked={item.workType.value === menuValue.workType.sell?"checked":""} value={menuValue.workType.sell} disabled={!item.workType.editable} onChange={(event) => onDetailChange(event.target.value, index, "workType")}/>
                            </td>
                            <td style={{textAlign:"right", paddingRight:"0"}}>
                                <label>งานพิมพ์</label>
                            </td>
                            <td style={{textAlign:"left", paddingLeft:"0"}}>
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
