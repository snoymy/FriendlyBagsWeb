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
        setOrderDetails(orderDetails.map(
                (subItem, subIndex) => {
                    if(index !== subIndex) return {...subItem}
                    return {...subItem, [prop]: value}
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
                {orderDetails.map((item, index) => {
                    console.log("map", item)
                    return (
                        <>
                        <tr key={index} id={index}>
                            <td>
                                <label style={{paddingLeft:"10px", paddingRight:"10px"}}>{index+1}</label>
                            </td>
                            <td>
                                <select name="paperType" id="paperType" value={item.paperType} onChange={(event) => onDetailChange(event.target.value, index, "paperType")}>
                                    {
                                        menuValue.paperType.map((menuItem) => {
                                            return (
                                                <option value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="paperThickness" id="paperThickness" value={item.paperThickness} onChange={(event) => onDetailChange(event.target.value, index, "paperThickness")}>
                                    {
                                        menuValue.paperThickness.map((menuItem) => {
                                            return (
                                                <option value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="bagSize" id="bagSize" value={item.paperType} onChange={(event) => onDetailChange(event.target.value, index, "bagSize")}>
                                    {
                                        menuValue.bagSize.map((menuItem) => {
                                            return (
                                                <option value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="shape" id="shape" value={item.paperType} onChange={(event) => onDetailChange(event.target.value, index, "shape")}>
                                    {
                                        menuValue.shape.map((menuItem) => {
                                            return (
                                                <option value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="bagEars" id="bagEars" value={item.paperType} onChange={(event) => onDetailChange(event.target.value, index, "bagEars")}>
                                    {
                                        menuValue.bagEars.map((menuItem) => {
                                            return (
                                                <option value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input type="number" min={0} name="colorAmount" id="colorAmount" value={item.colorAmount} onChange={(event) => onDetailChange(event.target.value, index, "colorAmount")}/>
                            </td>
                            <td>
                                <input type="checkbox" name="baseColor" id="baseColor" value={item.baseColor} onChange={(event) => onDetailChange(event.target.checked, index, "baseColor")}/>
                            </td>
                            <td>
                                <select name="color" id="" value={item.color} onChange={(event) => onDetailChange(event.target.value, index, "color")}>
                                    {
                                        menuValue.color.map((menuItem) => {
                                            return (
                                                <option value={menuItem}>{menuItem}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input type="number" min={0} name="quantity" id="quantity" value={item.quantity} onChange={(event) => onDetailChange(event.target.value, index, "quantity")}/>
                            </td>
                            <td>
                                <input type="number" min={0} name="price" id="price" value={item.price} onChange={(event) => onDetailChange(event.target.value, index, "price")}/>
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
                            <td style={{textAlign:"center", verticalAlign: "top"}}>
                                <label>Comment:</label>
                            </td>
                            <td style={{textAlign:"left", verticalAlign: "top"}} colSpan="4">
                                <textarea style={{width:"100%", height:"70px"}} value={item.comment} onChange={(event) => onDetailChange(event.target.value, index, "comment")}/>
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
                        </>
                    )
                })}
                </tbody>

            </table>
        </div>
    )
}
export default PaperBagOrder;
