import { useState} from "react" 
import BackEndInterface from "../../../../BackEndInterface";

const [orderHistory, setOrderHistory] = useState(getOrderHistory())

const getOrderHistory = (name="*") => {
    console.log(name)
    return BackEndInterface.getOrderHistory(name)
}

const ViewDetailModal = (
    <div style={{padding: "30px"}}>
        <div className={styles["paper-bag-order-table"]} style={{paddingBottom:"50px"}}>
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
            {orderHistory.map((item, index) => {
                console.log("map", item)
                if(index === viewIndex)
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
                            <label style={{width:"60%", textAlign:"left"}}>{item.colorAmount !== 0 ? item.color : "-"}</label>
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
            })}
            </tbody>
        </table>
    </div>
    <div style={{textAlign:"right", marginRight:"30px", marginTop:"30px"}}>
        <button type="button" onClick={() => setShowModal(false)}>close</button>
    </div>
    </div>
)

export default ViewDetailModal;
