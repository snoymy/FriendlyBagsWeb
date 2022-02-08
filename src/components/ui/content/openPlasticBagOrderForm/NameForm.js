import { useMemo, useState } from "react"
import styles from "./NameForm.module.css"
import BackEndInterface from "../../../../BackEndInterface"
import Modal from "../../modal/Modal"

const getCustomerData = () => {
    return BackEndInterface.getCustomer()
}

const NameForm = ({nameForm, setNameForm, menuValue}) => {
    const [showModal, setShowModal] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    
    const onFormChange = (event, prop) => {
        console.log(event.target.value)
        setNameForm({...nameForm, [prop]:{value:event.target.value, editable:true}})
    }

    const clearForm = () => {
       const clearName = {
           name: {value:"", editable:true},
           address: {value:"", editable:true},
           date: {value:"" , editable:true},
           deadline: {value:"", editable:true},
           area: {value:"", editable:true},
       }
        setNameForm(clearName)
    }

    const onSelectName = (item) => {
       const selectedName = {
           name: {value:item.name, editable:false},
           address: {value:item.address, editable:false},
           date: {value:nameForm.date.value, editable:true},
           deadline: {value:nameForm.deadline.value, editable:true},
           area: {value:item.area, editable:true},
       }
        setNameForm(selectedName)
        setShowModal(false)
    }
    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const updateDeadline = (date, days) => {
        if(nameForm.deadline.value === "" && nameForm.date.value !== "")
            setNameForm({...nameForm, ["deadline"]:{value:addDays(date, days).toISOString().split("T")[0], editable:true}}) 
    }

    const updateDeadlineMemo = useMemo(() => {
        updateDeadline(nameForm.date.value, 30)
    }, [nameForm.date.value]) 

    const fetchName = () => {
        let temp = []
        const customerData = getCustomerData() 
        customerData.map((item) => {
            if(name !== ""){
                if(item.name.toLowerCase().search(name.toLowerCase()) >= 0){
                    temp = [...temp, item] 
                }
            }
        })
        setSearchResult(temp)
    }

    const onNameChange = useMemo(fetchName, [name])

    const modalContent = (
        <div style={{padding:"30px"}}>
            <table>
                <tbody>
                    <tr>
                        <td><label>นามลูกค้า</label></td>
                        <td>
                            <input type="text" value={name} onChange={(event) => {setName(event.target.value);}}/>
                            {onNameChange}
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
                                            <span>{item.name}</span>
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
                            <input type="text" id="name" name="name" value={nameForm.name.value} disabled={!nameForm.name.editable} onChange={(event) => onFormChange(event, "name")} style={{minWidth: "300px"}}/>
                        </td>
                        <td>
                            <label>วันที่:</label> 
                        </td>
                        <td>
                            <input type="date" id="date" name="date" value={nameForm.date.value} disabled={!nameForm.date.editable} onChange={(event) => { onFormChange(event, "date") } } />
                        </td>
                        {updateDeadlineMemo}
                        <td>
                            <label>กำหนดส่ง:</label> 
                        </td>
                        <td>
                            <input type="date" id="deadline" name="deadline" value={nameForm.deadline.value} disabled={!nameForm.deadline.editable} onChange={(event) => onFormChange(event, "deadline")}/>
                        </td>
                        <td>
                            <label>เขตพื้นที่:</label>
                        </td>
                        <td>
                            <select name="area" id="area" value={nameForm.area.value} disabled={!nameForm.area.editable} onChange={(event) => onFormChange(event, "area")}>
                                {
                                    menuValue.area.map((menuItem, subIndex) => {
                                        return (
                                            <option key={subIndex} value={menuItem}>{menuItem}</option>
                                        )
                                    })
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label></label>
                        </td>
                        <td style={{textAlign:"right", verticalAlign: "top"}}>
                            <label>ที่อยู่:</label> 
                        </td>
                        <td style={{textAlign:"left"}} colSpan={5}>
                            <textarea style={{width:"95%", height:"100px"}}type="text" id="address" name="address" value={nameForm.address.value} disabled={!nameForm.address.editable} onChange={(event) => onFormChange(event, "address")}/>
                        </td>
                        <td>
                            <label></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className={styles["paper-bag-order-form-clear-button"]} type="button" onClick={clearForm}>
                                Clear form
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Modal style={{width:"1000px"}} content={modalContent} showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}

export default NameForm;
