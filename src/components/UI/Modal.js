import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

function Backdrop({onClose}) {
    return <div className={classes.backdrop} onClick={onClose}/>
}

function ModalOverlay({children}) {
    return <div className={classes.modal}>{children}</div>
}

const portalElement = document.getElementById("overlays");

function Modal({onCloseModal, children}) {
    return <>
        {ReactDOM.createPortal(<Backdrop onClose={onCloseModal}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
}
export default Modal;
