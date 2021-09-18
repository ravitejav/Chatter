import { useEffect, useState } from 'react';
import firebase from 'firebase';

import { ERROR_CONSTANT, FAILED_TO_UPDATE, SUCCESS_CONSTANT, TOAST_CONSTANT, UPDATED_SUCCESSFULLY } from '../../Constants/ToasterContants';
import { NAME } from '../../Constants/ValidatorDefaults';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { callBack } from '../../Helpers/CallBackHelper';
import { Validate } from '../../Helpers/Validators';
import { toasterType } from '../../Models/ToasterModel';
import Toaster from '../Toaster';
import './Profile.css';
import { FirebaseStorage } from '../../Firebase/FirebaseStorage';
import { verifyImage } from '../../Helpers/AdditionalDetails';

export const Profile = () => {

    const [profilePicName, setProfiePicName] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState({} as any);
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);

    useEffect(() => {
        const firebaseUser = new FirebaseUser();
        firebaseUser.getCurrentUserData((res: firebase.database.DataSnapshot) => setAdditionalDetails(res.val()));
    }, []);

    const handleFormUpdate = (e: any) => {
        e.preventDefault();
        if (profilePicName !== '') {
            UpdateUserData((document.getElementById('profilePic') as HTMLInputElement)?.files?.item(0) as any);
        } else {
            UpdateUserData(null)
        }
    }

    const UpdateUserData = (fileString: any) => {
        if (fileString && Validate(NAME, additionalDetails.name)) {
            const firebaseStorage = new FirebaseStorage();
            firebaseStorage.saveProfilePic(fileString).then((res) => {
                res.ref.getDownloadURL()
                    .then(result => {
                        UpdateadditionalDetails(result);
                    }).catch(error => {
                        setToastDetails(ERROR_CONSTANT(FAILED_TO_UPDATE));
                        callBack(1, resetToast);
                    })
            });
        } else {
            if (Validate(NAME, additionalDetails.name)) {
                UpdateadditionalDetails()
            } else {
                setToastDetails(ERROR_CONSTANT(FAILED_TO_UPDATE));
                callBack(1, resetToast);
            }
        }
    }

    const UpdateadditionalDetails = (downloadURL?: any) => {
        const firebaseUser = new FirebaseUser();
        const userDetails = {
            ...additionalDetails,
        }
        if (downloadURL) {
            userDetails["profileUrl"] = downloadURL;
        }
        firebaseUser.saveUserData(userDetails)
            .then(res => {
                setToastDetails(SUCCESS_CONSTANT(UPDATED_SUCCESSFULLY));
                callBack(1, resetToast);
            })
            .catch(error => {
                setToastDetails(ERROR_CONSTANT(FAILED_TO_UPDATE));
                callBack(1, resetToast);
            })
    }

    const handleAdditionalDetails = (e: any) => {
        setAdditionalDetails({
            ...additionalDetails,
            [e.target.name]: e.target.value,
        });
    }


    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    return (
        <section className="profileWrapper center">
            <div className="profile center">
                <h3>
                    Update your profile
                </h3>
                <form className="center" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" name="name" placeholder={"Enter your name...."} onChange={handleAdditionalDetails} value={additionalDetails.name} />
                    <label htmlFor="profilePic" className="center button">Select your profile image...</label>
                    <input id="profilePic" type="file" title={"Select your profile image..."} accept="image/png, image/gif, image/jpeg" onChange={(e) => verifyImage(e, setProfiePicName)} />
                    {profilePicName ? <span className="profilePicname">{profilePicName}</span> : null}
                    <div className="submitButton button" onClick={handleFormUpdate}>
                        Save Updates
                    </div>
                </form>
            </div>
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </section>
    );

}