import React, { useEffect, useState } from 'react';
import styles from "../../styles/Profile.module.css";
import Image from 'next/image';

const Profile = ({ user }) => {
    const [showAccount, setShowAccount] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [showApplication, setShowApplication] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
      const fetchMyData = async () => {
        let data = {email: user.email}
        let theUser = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Users/getUser`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        let response = await theUser.json()
        setUserData(response.result);
      }

      fetchMyData();
    }, [user])
    

    const handleShow = (whichOne) => {
        switch(whichOne){
            case 1:
                {
                    setShowAccount(true);
                    setShowPassword(false);
                    setShowSecurity(false);
                    setShowApplication(false);
                    setShowNotification(false);
                    break;
                }
            case 2:
                {
                    setShowAccount(false);
                    setShowPassword(true);
                    setShowSecurity(false);
                    setShowApplication(false);
                    setShowNotification(false);
                    break;
                }
            case 3:
                {
                    setShowAccount(false);
                    setShowPassword(false);
                    setShowSecurity(true);
                    setShowApplication(false);
                    setShowNotification(false);
                    break;
                }
            case 4:
                {
                    setShowAccount(false);
                    setShowPassword(false);
                    setShowSecurity(false);
                    setShowApplication(true);
                    setShowNotification(false);
                    break;
                }
            case 5:
                {
                    setShowAccount(false);
                    setShowPassword(false);
                    setShowSecurity(false);
                    setShowApplication(false);
                    setShowNotification(true);
                    break;
                }
            default:
                {
                    setShowAccount(true);
                    setShowPassword(false);
                    setShowSecurity(false);
                    setShowApplication(false);
                    setShowNotification(false);
                    break;
                }
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <section className=" my-5">
        <div className="container">
            <div className="bg-white shadow rounded-lg d-block d-sm-flex">
                <div className={` ${styles.profileTabNav}  border-right`}>
                    <div className="p-4">
                        <div className={`${styles.imgCircle} text-center mb-3`}>
                            <Image width={100} height={100} src="/avatar/avatar.png" alt="Image" />
                        </div>
                        <h5 className="text-center">{user && user.username}</h5>
                    </div>
                    <div className="nav flex-column nav-pills" id="v-pills-tabs" role="tablist" aria-orientation="vertical">
                        <a href="#account" data-toggle="pill" className={`btn nav-link ${showAccount === true && 'active'} `} onClick={() => handleShow(1)} id="account-tab" role="tab" aria-controls="account" aria-selected="true">
                            <i className="fa fa-home text-center mr-1"></i>
                            Account
                        </a>
                        <a href="#password" role="tab" className={`btn nav-link ${showPassword === true && 'active'} `} onClick={() => handleShow(2)} id="password-tab" aria-controls="password" aria-selected="false">
                            <i className="fa fa-key text-center mr-1"></i>
                            Password
                        </a>
                        <a href="#security" role="tab" className={`btn nav-link ${showSecurity === true && 'active'} `} onClick={() => handleShow(3)} id="security-tab" aria-controls="security" aria-selected="false">
                            <i className="fa fa-user text-center mr-1"></i>
                            Security
                        </a>
                        <a href="#application" role="tab" className={`btn nav-link ${showApplication === true && 'active'} `} onClick={() => handleShow(4)} id="application-tab" aria-controls="application" aria-selected="false">
                            <i className="fa fa-tv text-center mr-1"></i>
                            Application
                        </a>
                        <a href="#notification" role="tab" className={`btn nav-link ${showNotification === true && 'active'} `} onClick={() => handleShow(5)} id="notification-tab" aria-controls="notification" aria-selected="false">
                            <i className="fa fa-bell text-center mr-1"></i>
                            Notification
                        </a>
                    </div>
                </div>
                <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                   {showAccount === true && <div className={`tab-pane fade ${showAccount == true && 'show active'} `} id="account" role="tabpanel" aria-labelledby="account-tab">
                        <h3 className="mb-4">Mon Profile</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="firstname">Nom et Prénom:</label>
                                    <input type="text" name="firstname" value={userData && userData !== {} && user.username} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <label htmlFor="email">Adresse Email:</label>
                                    <input type="email" name="email" value={userData && userData !== {} && userData.email} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <label htmlFor="phone">Numéro de Téléphone:</label>
                                    <input type="text" name="phone" value="+91 9876543215" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <label htmlFor="company">Direction</label>
                                    <input type="text" name="company" value={userData && userData !== {} && userData.direction_name + '('+ userData.direction_acronym + ')'} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="designation">Fonction</label>
                                    <input type="text" name="designation" value="UI Developer" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="bio">Bio</label>
                                    <textarea name="bio" id="bio" rows="4" className="form-control">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut laboriosam doloremque cupiditate neque, rerum qui, impedit odit doloribus consequuntur, quibusdam beatae est voluptatum. Eaque a, unde voluptatem ipsum mollitia repudiandae in adipisci.
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary">Update</button>
                            <button className="btn btn-light">Cancel</button>
                        </div>
                    </div>
                    }
                    {showPassword === true && <div className={`tab-pane fade ${showPassword == true && 'show active'} `} id="security" role="tabpanel" aria-labelledby="security-tab">
                        <h3 className="mb-4">Password Settings</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group col-md-6 mb-3">
                                    <label htmlFor="oldpassword">Old password</label>
                                    <input type="password" className="form-control" name="oldpassword" id="oldpassword" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="newpassword">New password</label>
                                    <input type="password" className="form-control" name="newpassword" id="newpassword" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="confirmnewpassword">Confirm new password</label>
                                    <input type="password" className="form-control" name="confirmnewpassword" id="confirmnewpassword" />
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button className="btn btn-primary">Update</button>
                            <button className="btn btn-light">Cancel</button>
                        </div>
                        </div>
                    }
                    {showSecurity === true && <div className={`tab-pane fade ${showSecurity == true && 'show active'} `} id="password" role="tabpanel" aria-labelledby="password-tab">
                        <h3 className="mb-4">Security Settings</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="login">Login</label>
                                    <input type="text" className="form-control" name="login" id="login" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="twofactorauth">Two-factor auth</label>
                                    <input type="text" className="form-control" name="twofactorauth" id="twofactorauth" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" name="recovery" value="" id="recovery" />
                                        <label className="form-check-label" htmlFor="recovery">Recovery</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary">Update</button>
                            <button className="btn btn-light">Cancel</button>
                        </div>
                    </div>
                    }
                    {showApplication === true && <div className={`tab-pane fade ${showApplication == true && 'show active'} `} id="application" role="tabpanel" aria-labelledby="application-tab">
                        <h3 className="mb-4">Application Settings</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="form-check">
                                        <input type="checkbox" value="" className="form-check-input" name="appcheck" id="appcheck" />
                                        <label className="form-check-label" htmlFor="appcheck">App check</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" value="" className="form-check-input" name="defaultCheck2" id="defaultCheck2" />
                                        <label className="form-check-label" htmlFor="defaultCheck2">
                                            Lorem ipsum dolor sit.
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary">Update</button>
                            <button className="btn btn-light">Cancel</button>
                        </div>
                    </div>
                    }
                    {showNotification === true && <div className={`tab-pane fade ${showNotification == true && 'show active'} `} id="notification" role="tabpanel" aria-labelledby="notification-tab">
                        <h3 className="mb-4">Notification Settings</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="form-check">
                                        <input type="checkbox" value="" className="form-check-input" name="notification1" id="notification1" />
                                        <label className="form-check-label" htmlFor="notification1">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo facere cumque minima a, suscipit obcaecati earum
                                        </label>
                                    </div>                                   
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input type="checkbox" value="" className="form-check-input" name="notification2" id="notification2" />
                                        <label className="form-check-label" htmlFor="notification2">
                                           amet consectetur adipisicing elit. Explicabo facere cumque minima
                                        </label>
                                    </div>                                   
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input type="checkbox" value="" className="form-check-input" name="notification3" id="notification3" />
                                        <label className="form-check-label" htmlFor="notification3">
                                            suscipit obcaecati earum
                                        </label>
                                    </div>                                   
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary">Update</button>
                            <button className="btn btn-light">Cancel</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    </section>
            </main>
        </div>
      )
}

export default Profile;