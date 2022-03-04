import React from "react";
import ReactDOM from "react-dom";

const Backdrop = () => {
    return (<div className = "backdrop"></div>);
}

const Modal = (props) => {

    const modal = (<React.Fragment>
        <Backdrop/>
        <div className = "modal">
            {props.children}
        </div>
    </React.Fragment>);

    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));

}

export default Modal;