import styles from "./Modal.module.css"

const Modal = ({content, showModal}) => {

    if(!showModal){
        return null
    }

    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                {content}
            </div>
        </div>
    )
}

export default Modal;
