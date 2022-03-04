import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AlertOverlay = (props) => {

    const alertStyles = ['alert', 'success'];

    if (props.isError) {
        alertStyles[1] = 'error';
    }

    return (
    <div className = {alertStyles.join(' ')}>
        {props.children}
        <button className = "dismiss-button" onClick = {props.onDismiss}>
            <FontAwesomeIcon icon = "times"/>
        </button>
    </div>);
}

const Alert = (props) => {
    return ReactDOM.createPortal(<AlertOverlay {...props} />, document.getElementById('alert-root'));
}

export default Alert;
