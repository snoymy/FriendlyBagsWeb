import { useState } from "react"
import Modal from "../../../../ui/modal/Modal"
import styles from "./NameForm.module.css"
import DataBase from "../../../../../MockDatabase"

const NameForm = ({nameForm, setNameForm}) => {
    const [showModal, setShowModal] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [date, setDate] = useState("")
    
    const onFormChange = (event, prop) => {
        console.log(event.target.value)
        setNameForm({...nameForm, [prop]:{value:event.target.value, editable:true}})
    }

    const clearForm = () => {
       const clearName = {
           fname: {value:"", editable:true},
           lname: {value:"", editable:true},
           address: {value:"", editable:true},
           date: {value:"" , editable:true}
       }
        setNameForm(clearName)
    }

    const onSelectName = (item) => {
       const selectedName = {
           fname: {value:item.fname, editable:false},
           lname: {value:item.lname, editable:false},
           address: {value:item.address, editable:false},
           date: {value:nameForm.date.value, editable:true}
       }
        setNameForm(selectedName)
        setShowModal(false)
    }

    const fetchName = () => {
        let temp = []
        const customerData = DataBase.getCustomer()
        customerData.map((item) => {
            if(fname !== ""){
                if(lname !== ""){
                    if(item.fname.toLowerCase() === fname.toLowerCase() && item.lname.toLowerCase() === lname.toLowerCase()){
                        temp = [...temp, item] 
                    }
                }
            }
        })
        setSearchResult(temp)
    }

    const modalContent = (
        <div style={{padding:"30px"}}>
            <table>
                <tbody>
                    <tr>
                        <td><label>นามลูกค้า</label></td>
                        <td>
                            <input type="text" value={fname} onChange={(event) => setFname(event.target.value)}/>
                        </td>
                        <td><label>สกุล</label></td>
                        <td>
                            <input type="text" value={lname} onChange={(event) => setLname(event.target.value)}/>
                        </td>
                        <button type="button" onClick={fetchName}>🔍</button>
                    </tr>
                </tbody>
            </table>
            <div style={{height: "300px", overflowY:"scroll"}}>
                <table className={styles["modal-content"]} style={{width:"100%"}}>
                    <tbody>
                        {
                            searchResult.map((item, index) => {
                                return (
                                    <>
                                    <tr>
                                        <td>
                                            <span>{item.fname}</span>
                                        </td>
                                        <td>
                                            <span>{item.lname}</span>
                                        </td>
                                        <td>
                                            <span style={{border: "2px solid #e8e8e8"}}>{item.address}</span>
                                        </td>
                                        <td>
                                            <button type="button" onClick={()=>onSelectName(item)}>Select</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="11"><hr/></td>
                                    </tr>
                                    </>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div style={{textAlign:"right", marginRight:"30px", marginTop:"30px"}}>
                <button type="button" onClick={() => setShowModal(false)}>close</button>
            </div>
        </div>
    )

    return (
        <div className={styles["paper-bag-order-form"]}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button type="button" onClick={() => setShowModal(true)}>Old Customer?</button>
                        </td>
                        <td style={{textAlign: "right"}}>
                            <label>นามลูกค้า:</label> 
                        </td>
                        <td>
                            <input type="text" id="fname" name="fname" value={nameForm.fname.value} disabled={!nameForm.fname.editable} onChange={(event) => onFormChange(event, "fname")} style={{minWidth: "300px"}}/>
                        </td>
                        <td>
                            <label>สกุล:</label>
                        </td>
                        <td>
                             <input type="text" id="lname" name="lname" value={nameForm.lname.value} disabled={!nameForm.lname.editable} onChange={(event) => onFormChange(event, "lname")} style={{minWidth: "300px"}}/>
                        </td>
                        <td>
                            <label>วันที่:</label> 
                        </td>
                        <td>
                            <input type="date" id="date" name="date" value={nameForm.date.value} disabled={!nameForm.date.editable} onChange={(event) => onFormChange(event, "date")}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label></label>
                        </td>
                        <td style={{textAlign:"right", verticalAlign: "top"}}>
                            <label>ที่อยู่:</label> 
                        </td>
                        <td style={{textAlign:"left"}} colSpan="3">
                            <textarea style={{width:"95%", height:"100px"}}type="text" id="address" name="address" value={nameForm.address.value} disabled={!nameForm.address.editable} onChange={(event) => onFormChange(event, "address")}/>
                        </td>
                        <td>
                            <label></label>
                        </td>
                        <td>
                            <button className={styles["paper-bag-order-form-clear-button"]} type="button" onClick={clearForm}>
                                Clear form
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Modal content={modalContent} showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}

export default NameForm;
