import {useEffect, useState} from "react"
import styles from "./Modal.module.css"

const Modal = ({content, showModal, style}) => {
    const [modalContent, setModalContent] = useState(content) 
    if(!showModal){
        return null
    }

    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]} style={style}>
                {content}
            </div>
        </div>
    )
}

export default Modal;
