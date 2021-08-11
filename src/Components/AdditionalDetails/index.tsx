import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DEFAULT_ADDITONAL_DETAILS } from '../../Constants/DefaultValues';
import { ERROR_CONSTANT, FAILED_TO_UPDATE, INVALID_NAME, TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { NAME } from '../../Constants/ValidatorDefaults';
import { FirebaseAuth } from '../../Firebase/FirebaseAuth';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { callBack, uidExtractor } from '../../Helpers/CallBackHelper';
import { Validate } from '../../Helpers/Validators';
import { toasterType } from '../../Models/ToasterModel';
import Toaster from '../Toaster';
import './AdditionalDetails.css';

const AdditionalDetails = () => {

    const [addtionalDetial, setAdditionalDetails] = useState(DEFAULT_ADDITONAL_DETAILS);
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);

    const history = useHistory();

    const handleSaving = (e: any) => {
        e.preventDefault();
        if (Validate(NAME, addtionalDetial.name)) {
            const userObj = new FirebaseUser();
            const firebaseAuth = new FirebaseAuth();
            userObj.saveUserData({ ...addtionalDetial },  uidExtractor(firebaseAuth.getCurrentUser()?.email || ""))
                .then(res => {
                    history.push("/Chatter/chat");
                })
                .catch(error => {
                    setToastDetails(ERROR_CONSTANT(FAILED_TO_UPDATE));
                });
        } else {
            setToastDetails(ERROR_CONSTANT(INVALID_NAME));
            callBack(1, resetToast);
        }
    }

    const handleAdditionalDetails = (name: string, e: any) => {
        setAdditionalDetails({
            ...addtionalDetial,
            [name]: e.target.value,
        });
    }

    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    return (
        <div className="additionalDetailsWrapper">
            <div className="additionalDetailsForm">
                <p>
                    Please add additional Details to continue:
                </p>
                <form onSubmit={handleSaving}>
                    <input type="text" required placeholder="Full Name" onChange={(e) => handleAdditionalDetails("name", e)} />
                    <button>Save Details</button>
                </form>
            </div>
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </div>
    );
}

export default AdditionalDetails;