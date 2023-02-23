import { faStar, faPen, faEye, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styles from './Information.module.scss';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import firebase from "~/firebase"

import { getMethodParam, postMethod } from '~/utils/fetchData';
//import avatar from '../../Server/TDTUSecondhandShop/src/main/image/x3FYCYN39Z.png';
import avatar from '~/assets/images/avatar_post.jpg';
import { GlobalState } from '~/context/GlobalState';
import { TOKEN_NAME } from '~/credentials';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const cx = classNames.bind(styles);

function Information() {
    const data = JSON.parse(localStorage.getItem(TOKEN_NAME))
    const email = data.email
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
    // console.log("RateArray", rateArray)
    
    // const [email, setEmail] = useState('');
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

    const [image, setImage] = useState(null)

    let urlImageFirebase = ''

    const random = Math.random();

    const handleEditInformation = async (e) => {
        e.preventDefault();
        const storage = getStorage();
        if(image != null){
            const storageRef = ref(storage, image.name + random);
    
            let snapshot =  await uploadBytes(storageRef, image)
            urlImageFirebase = await getDownloadURL(snapshot.ref)
        }

        const body = new FormData();
        body.append("email", email)
        body.append("phone", phone)
        body.append("gender", gender)
        body.append("birthday", birthday)
        body.append("personal-email", "baochua9a4@gmail.com")
        body.append("personal-email-hidden", "ACTIVE")
        body.append("phone-hidden", "ACTIVE")
        body.append("gender-hidden", "ACTIVE")
        body.append("birthday-hidden", "ACTIVE")
        body.append("avatar", urlImageFirebase)

        postMethod('user/profile/edit', body)
            .then((res) => {
                if (res) {
                    console.log("RESPONSE AVATAR", res)
                    setPhone(res.phone)
                    setGender(res.gender)
                    setBirthday(res.birthday)
                    setAvatarUser(res.avatar)
                    setPersonalEmail(res.personalEmail)
                    Swal.fire({
                        title: 'Success',
                        text: 'Edit information successfully',
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
    };

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

        if(emailShop === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your email shop",
                icon: 'error',
            });
            return;
        }

        handleReportPostChecked();
    }

    const handleReportPostChecked = () => {
        const body = new FormData()
        body.append("email-report", email)
        body.append("email-shop", emailShop)
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
                        <p>{data.name}</p>
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
                            <div>
                                <Link to="/manager/information">Your Information</Link>
                            </div>
                            <div>
                                <Link to="/manager/information_post">Your Post</Link>
                            </div>
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
                                    <select type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option>Nam</option>
                                        <option>Nữ</option>
                                    </select>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label>Birthday</label>
                                    <input type="date" value={birthday} name="birthday" onChange={(e) => setBirthday(e.target.value)} />
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
                                <div className={cx('container__form-group')}>
                                    <label>Avatar</label>
                                    <input type="file" name="avatar" onChange={(e) => setImage(e.target.files[0])}  />
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className={cx('container__form-group-icon', 'hide-on-mobile')}
                                    />
                                </div>
                                <div className={cx('container__form-group')}>
                                    <button className={cx('btn-change')} onClick={handleEditInformation}>Change</button>
                                </div>
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
                    <input id='email-shop' type="text" className={cx('form-control')} name="email-shop" onChange={(e) => setEmailShop(e.target.value)}/>
                </div>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='email'>Email Report</label>
                    <input id="email" type="text" className={cx('form-control')} name="email" readOnly value={email} />
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
    );
}

export default Information;
