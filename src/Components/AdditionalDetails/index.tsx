import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DEFAULT_ADDITONAL_DETAILS } from '../../Constants/DefaultValues';
import { ERROR_CONSTANT, FAILED_TO_UPDATE, FILE_ERROR, INVALID_NAME, MISSING_DATA, TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { NAME } from '../../Constants/ValidatorDefaults';
import { FirebaseStorage } from '../../Firebase/FirebaseStorage';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { verifyImage } from '../../Helpers/AdditionalDetails';
import { callBack } from '../../Helpers/CallBackHelper';
import { Validate } from '../../Helpers/Validators';
import { toasterType } from '../../Models/ToasterModel';
import { UserDetails } from '../../Models/UserModels';
import Toaster from '../Toaster';
import './AdditionalDetails.css';

const AdditionalDetails = () => {

    const [addtionalDetial, setAdditionalDetails] = useState(DEFAULT_ADDITONAL_DETAILS);
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [profilePicName, setProfiePicName] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);

    const history = useHistory();

    const handleSaving = (e: any) => {
        e.preventDefault();
        if (Validate(NAME, addtionalDetial.name) && verifyImage({ target: document.getElementById('profilePic') }, setProfiePicName)) {
            const userObj = new FirebaseUser();
            UpdateUserData((document.getElementById('profilePic') as HTMLInputElement)?.files?.item(0) as any)
                .then((firbaseData: any) => {
                    userObj.saveUserData({ ...addtionalDetial, ...firbaseData } as UserDetails)
                        .then(res => {
                            history.push("/Chatter/chat");
                        })
                        .catch(error => {
                            setToastDetails(ERROR_CONSTANT(FAILED_TO_UPDATE));
                            setButtonStatus(false);
                        });
                }).catch(() => {
                    setButtonStatus(false);
                    //handle error
                });
        } else {
            setToastDetails(ERROR_CONSTANT(MISSING_DATA));
            callBack(1, resetToast);
        }
    }

    const handleAdditionalDetails = (e: any) => {
        const targetName = e?.target?.name;
        setAdditionalDetails((addtionalData) => ({
            ...addtionalData,
            [targetName]: e?.target?.value,
        }));
    }

    const UpdateUserData = (fileString: any) => {
        const firebaseStorage = new FirebaseStorage();
        return new Promise((resolve, reject) => {
            setButtonStatus(true);
            firebaseStorage.saveProfilePic(fileString).then((res) => {
                res.ref.getDownloadURL()
                    .then(result => {
                        resolve({
                            profileUrl: result,
                        });
                    }).catch(error => {
                        reject(error);
                        setToastDetails(ERROR_CONSTANT(FAILED_TO_UPDATE));
                        callBack(1, resetToast);
                    })
            });
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
                    <input type="text" required placeholder="Full Name" name="name" onChange={handleAdditionalDetails} />
                    <label htmlFor="profilePic" className="center button">Select your profile image...</label>
                    <input id="profilePic" type="file" title={"Select your profile image..."} accept="image/png, image/gif, image/jpeg" onChange={(e) => verifyImage(e, setProfiePicName)} />
                    {profilePicName ? <span className="profilePicname">{profilePicName}</span> : null}
                    <button disabled={buttonStatus}>Save Details</button>
                </form>
            </div>
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </div>
    );
}

export default AdditionalDetails;