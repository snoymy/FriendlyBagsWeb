import styles from "./PaperBagOrderForm.module.css"

const PaperBagOrder = ({orderDetails, setOrderDetails}) => {
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

    const onDetailChange = (event, index, prop) => {
        setOrderDetails(orderDetails.map(
                (subItem, subIndex) => {
                    if(index !== subIndex) return {...subItem}
                    return {...subItem, [prop]: event.target.value}
                }
            )
        )
    }

    return (
        <div className={styles["paper-bag-order"]}>
            <table>
                <thead>
                    <tr>
                        <th><label style={{paddingLeft:"50px"}}>ลำดับที่</label></th>
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
                        <tr key={index} id={index}>
                            <td>
                                <label style={{paddingLeft:"50px"}}>{index+1}</label>
                            </td>
                            <td>
                                <select name="paperType" id="paperType" value={item.paperType} onChange={(event) => onDetailChange(event, index, "paperType")}>
                                    <option value="HD">HD</option>
                                    <option value="KI">KI</option>
                                </select>
                            </td>
                            <td>
                                <select name="paperThickness" id="paperThickness" value={item.paperThickness} onChange={(event) => onDetailChange(event, index, "paperThickness")}>
                                    <option value="HD">HD</option>
                                    <option value="KI">KI</option>
                                </select>
                            </td>
                            <td>
                                <select name="bagSize" id="bagSize" value={item.paperType} onChange={(event) => onDetailChange(event, index, "bagSize")}>
                                    <option value="HD">HD</option>
                                    <option value="KI">KI</option>
                                </select>
                            </td>
                            <td>
                                <select name="shape" id="shape" value={item.paperType} onChange={(event) => onDetailChange(event, index, "shape")}>
                                    <option value="HD">HD</option>
                                    <option value="KI">KI</option>
                                </select>
                            </td>
                            <td>
                                <select name="bagEars" id="bagEars" value={item.paperType} onChange={(event) => onDetailChange(event, index, "bagEars")}>
                                    <option value="HD">HD</option>
                                    <option value="KI">KI</option>
                                </select>
                            </td>
                            <td>
                                <input type="number" min={0} name="colorAmount" id="colorAmount" value={item.colorAmount} onChange={(event) => onDetailChange(event, index, "colorAmount")}/>
                            </td>
                            <td>
                                <select name="baseColor" id="baseColor" value={item.baseColor} onChange={(event) => onDetailChange(event, index, "baseColor")}>
                                    <option value="HD">HD</option>
                                    <option value="KI">KI</option>
                                </select>
                            </td>
                            <td>
                                <select name="color" id="" value={item.color} onChange={(event) => onDetailChange(event, index, "color")}>
                                    <option value="HD">HD</option>
                                    <option value="KI">KI</option>
                                </select>
                            </td>
                            <td>
                                <input type="number" min={0} name="quantity" id="quantity" value={item.quantity} onChange={(event) => onDetailChange(event, index, "quantity")}/>
                            </td>
                            <td>
                                <input type="number" min={0} name="price" id="price" value={item.price} onChange={(event) => onDetailChange(event, index, "price")}/>
                            </td>
                            <td>
                                <button type="button">Upload</button>
                            </td>
                            <td>
                                <button className={styles["paper-bag-order-delete-button"]} type="button" style={{border:"none"}} onClick={()=>removeOrder(index)}>X</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>

            </table>
        </div>
    )
}
export default PaperBagOrder;
