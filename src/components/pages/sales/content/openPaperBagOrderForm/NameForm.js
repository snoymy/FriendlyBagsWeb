import styles from "./NameForm.module.css"

const NameForm = ({nameForm, setNameForm}) => {
    
    const onFormChange = (event, prop) => {
        console.log(event.target.value)
        setNameForm({...nameForm, [prop]:event.target.value})
    }

    return (
        <div className={styles["paper-bag-order-form"]}>
                            <input type="text" id="fname" name="fname" value={nameForm.fname} onChange={(event) => onFormChange(event, "fname")} style={{minWidth: "300px"}}/>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>นามลูกค้า:</label> 
                        </td>
                        <td>
                            <input type="text" id="fname" name="fname" value={nameForm.fname} onChange={(event) => onFormChange(event, "fname")} style={{minWidth: "300px"}}/>
                        </td>
                        <td>
                            <label>สกุล:</label>
                        </td>
                        <td>
                             <input type="text" id="lname" name="lname" value={nameForm.lname} onChange={(event) => onFormChange(event, "lname")} style={{minWidth: "300px"}}/>
                        </td>
                        <td>
                            <label>วันที่:</label> 
                        </td>
                        <td>
                            <input type="date" id="date" name="date" value={nameForm.date} onChange={(event) => onFormChange(event, "date")}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"right", verticalAlign: "top"}}>
                            <label>ที่อยู่:</label> 
                        </td>
                        <td style={{textAlign:"left"}} colSpan="3">
                            <textarea style={{width:"95%", height:"100px"}}type="text" id="address" name="address" value={nameForm.address} onChange={(event) => onFormChange(event, "address")}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default NameForm;
