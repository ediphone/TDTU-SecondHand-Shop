import React from "react";
import { useParams } from "react-router-dom";
import { faStar, faEye, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './Param.module.scss';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { getMethodParam, postMethod } from '~/utils/fetchData';
//import avatar from '../../Server/TDTUSecondhandShop/src/main/image/x3FYCYN39Z.png';
import avatar from '~/assets/images/avatar_post.jpg';
// import { GlobalState } from '~/context/GlobalState';
import { TOKEN_NAME } from '~/credentials';

const cx = classNames.bind(styles);

function Param(){
    const {email} = useParams()

    const data = JSON.parse(localStorage.getItem(TOKEN_NAME))
    const emailUser = data.email

    // const state = useContext(GlobalState);
    const [rate, setRate] = useState(0)

    const getRates = async () => {
        let response = await getMethodParam('user/profile/rate', 'email', email);
        return response;
    };

    let rateArray = []
    let rateNone = []
    console.log(rate)
    for(let i = 0; i < Math.round(rate); i++){
        rateArray.push(i)
    }

    for(let i = 0; i < 5 - Math.round(rate); i++){
        rateNone.push(i)
    }

    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [avatarUser, setAvatarUser] = useState('');
    const [personalEmail, setPersonalEmail] = useState('')

    const [user, setUser] = useState([])

    const getUsers = async () => {
        let response = await getMethodParam('user/profile/rate', 'email', email);
        return response;
    };

    useEffect(() => {
        const getProfile = async () => {
            let response = await getMethodParam('user/profile', 'email', email)
            return response;
        };
        getProfile()
            .then((res) => {
                console.log("User is: ", res)
                setUser(res)
                // setEmail(res.email)
                setPhone(res.phone)
                setGender(res.gender)
                setBirthday(res.birthday)
                setAvatarUser(res.avatar)
                setPersonalEmail(res.personalEmail)
            })
            .catch((err) => {
                console.log(err);
            });
        getRates()
            .then((res) => {
                console.log("Res in context", res)
                setRate(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Report Shop
    const [showReport, setShowReport] = useState(false);
    const [emailShop, setEmailShop] = useState('');
    const [description, setDescription] = useState('');

    const handleShowReport = (e) => {
        setShowReport(true);
    };

    const handleCloseReport = (e) => {
        setShowReport(false);
    }

    const handleReportShop = (e) => {
        e.preventDefault();
        
        if(description === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your description",
                icon: 'error',
            });
            return;
        }

        handleReportPostChecked();
    }

    const handleReportPostChecked = () => {
        const body = new FormData()
        body.append("email-report", emailUser)
        body.append("email-shop", email)
        body.append("description", description)
        postMethod('user/shop-report/report', body)
            .then((res) => {
                setShowReport(false)
                if (res == true) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Report shop successfully',
                        icon: 'success',
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: res.message,
                        icon: 'error',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className={cx('container')}>
                <label htmlFor="navbar__mobile-header" className={cx('navigation__mobile')}>
                    <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
                </label>
                <div className={cx('container__header')}>
                    <img src={user.avatar==null ? avatar : avatarUser} alt="" className={cx('container__header-img')} />
                    <div className={cx('container__header-avatar')}>
                        <p>{user.name}</p>
                        <p>{email.split('@')[0]}</p>
                        <p>
                            {rateArray.map((item, index) => (
                                <FontAwesomeIcon icon={faStar} key={index}/>
                            ))}
                            {rateNone.length > 0 && rateNone.map((item, index) => (
                                <FontAwesomeIcon icon={faStar} key={index} className={cx('start__no-color')}/>
                            ))}
                            {/* <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} /> */}
                        </p>
                    </div>
                </div>
                <div className={cx('container__content')}>
                    <div className={cx('container__wrapper')}>
                        <div className={cx('container__wrapper-header')}>
                            {/* <div>
                                <Link to="/information">Your Information</Link>
                            </div>
                            <div>
                                <Link to="/information_post">Your Post</Link>
                            </div> */}
                        </div>
                        <div className={cx('container__wrapper-choose')}>
                            {/* <button className={cx('container__wrapper-button', 'btn-outline-danger')} onClick={handleShowReport}>
                                Report Shop
                            </button> */}
                        </div>
                        <div className={cx('container__wrapper-content')}>
                            <form>
                                <div className={cx('container__form-group')}>
                                    <label>Personal Email</label>
                                    <input
                                        type="text"
                                        value={personalEmail}
                                        name="email"
                                        onChange={(e) => setPersonalEmail(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        name="phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label>Gender</label>
                                    <input type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label>Birthday</label>
                                    <input type="text" value={birthday} name="birthday" onChange={(e) => setBirthday(e.target.value)} />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group', 'hide')}>
                                    <label>Personal Email</label>
                                    <input
                                        type="text"
                                        value="baochua9a4@gmail.com"
                                        name="personal-email"
                                        // onChange={setEmailUser}
                                        readOnly
                                    />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group', 'hide')}>
                                    <label>Personal Email Hidden</label>
                                    <input
                                        type="text"
                                        value="ACTIVE"
                                        name="personal-email-hidden"
                                        // onChange={setEmailUser}
                                        readOnly
                                    />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group', 'hide')}>
                                    <label>Phone Hidden</label>
                                    <input
                                        type="text"
                                        value="ACTIVE"
                                        name="phone-hidden"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group', 'hide')}>
                                    <label>Gender Hidden</label>
                                    <input name="gender-hidden" value="ACTIVE" type="text" readOnly />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group', 'hide')}>
                                    <label>Birthday Hidden</label>
                                    <input value="ACTIVE" name="birthday-hidden" type="text" readOnly />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                {/* <div className={cx('container__form-group')}>
                                    <button className={cx('btn-change')}>Change</button>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showReport} onHide={handleCloseReport}>
                <Modal.Header closeButton>
                <Modal.Title>Report Shop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group','mb-3')}>
                        <label htmlFor='email-shop'>EmailShop</label>
                        <input id='email-shop' type="text" className={cx('form-control')} name="email-shop" readOnly value={email}/>
                    </div>
                    <div className={cx('form-group','mb-3')}>
                        <label htmlFor='email'>Email Report</label>
                        <input id="email" type="text" className={cx('form-control')} name="email" readOnly value={emailUser} />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor='description'>Description</label>
                        <input id="description" type="text" className={cx('form-control')} name="description" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseReport}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleReportShop}>
                    Report
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Param;


