import styles from "./NameForm.module.css"

const NameForm = ({nameForm, setNameForm}) => {
    
    const onFormChange = (event, prop) => {
        console.log(event.target.value)
        setNameForm({...nameForm, [prop]:{value:event.target.value, editable:true}})
    }

    return (
        <div className={styles["paper-bag-order-form"]}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <button>Old Customer?</button>
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
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NameForm;
