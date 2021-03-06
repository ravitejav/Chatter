import { faCheckCircle, faExclamationTriangle, faInfo, faShieldAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { callBack } from '../../Helpers/CallBackHelper';
import { ToasterProps, toasterType } from '../../Models/ToasterModel';
import './Toaster.css';

const Toaster = ({ time, message, type, styles = {}, showToast = false }: ToasterProps) => {

    const [showToaster, setShowToaster] = useState(false);

    useEffect(() => {
        if(showToast) {
            showToastMessage();
        }
    }, [showToast]);

    const showToastMessage = () => {
        setShowToaster(true);
        callBack(time, hideToaster);
    }

    const hideToaster = () => setShowToaster(false);

    const getClassNames = (customTypeForClass: toasterType) => {
        switch (customTypeForClass) {
            case "ERROR": return "toastWrapper error";
            case "SUCCESS": return "toastWrapper success";
            case "WARNING": return "toastWrapper warning";
            default: return "toastWrapper info";
        }
    }

    const getIcons = (customType: toasterType): IconDefinition => {
        switch (customType) {
            case "ERROR": return faShieldAlt;
            case "SUCCESS": return faCheckCircle;
            case "WARNING": return faExclamationTriangle;
            default: return faInfo;
        }
    }

    return (
        showToaster
            ? (
                <div className={getClassNames(type)} style={styles}>
                    <div className="iconWrapper">
                        <FontAwesomeIcon icon={getIcons(type)} />
                    </div>
                    <div className="messageWrapper">
                        {message}
                    </div>
                </div>
            ) : null
    );
}

export default Toaster;