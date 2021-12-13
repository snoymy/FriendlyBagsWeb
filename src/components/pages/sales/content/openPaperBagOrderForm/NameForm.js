import styles from "./NameForm.module.css"

const NameForm = ({nameForm, setNameForm}) => {
    
    const onFormChange = (event, prop) => {
        console.log(event.target.value)
        setNameForm({...nameForm, [prop]:event.target.value})
    }

    return (
        <div className={styles["paper-bag-order-form"]}>
        <div className={styles["display-row"]}>

            <div className={styles["input-area"]}>
                <label>นามลูกค้า:</label> <input type="text" id="fname" name="fname" value={nameForm.fname} onChange={(event) => onFormChange(event, "fname")} style={{minWidth: "300px"}}/>
            </div>

            <div className={styles["input-area"]}>
                <label>สกุล:</label> <input type="text" id="lname" name="lname" value={nameForm.lname} onChange={(event) => onFormChange(event, "lname")} style={{minWidth: "300px"}}/>
            </div>

            <div className={styles["input-area"]}>
                <label>วันที่:</label> <input type="date" id="date" name="date" value={nameForm.date} onChange={(event) => onFormChange(event, "date")}/>
            </div>

        </div>

        <div className={styles["display-row"]}>

            <div className={styles["input-area"]}>
                <label>ที่อยู่:</label> <textarea type="text" id="address" name="address" value={nameForm.address} onChange={(event) => onFormChange(event, "address")} style={{minWidth: "500px", minHeight: "100px"}}/>
            </div>

        </div>
        </div>
    )
}

export default NameForm;