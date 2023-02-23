import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { useState, useEffect } from  'react';
import Swal from 'sweetalert2';

import styles from './User.module.scss';
import { getMethod, postMethod } from '~/utils/fetchData';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const cx = classNames.bind(styles);

function User() {
    const [user, setUser] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            let response = await getMethod('manager/user');
            return response;
        };
        getUsers()
            .then((res) => {
                console.log("Res in context", res)
                setUser(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Edit
    const [showEdit, setShowEdit] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [status, setStatus] = useState(" ");

    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (e) => {
        setEmail(e.target.getAttribute('data-email'));
        // setPhone(e.target.getAttribute("data-phone"))
        // setGender(e.target.getAttribute("data-gender"))
        // setBirthday(e.target.getAttribute("data-birthday"))
        // setPersonalEmail(e.target.getAttribute("data-personalemail"))
        setShowEdit(true);
    };

    //Sửa dữ liệu 

    const [image, setImage] = useState(null)

    let urlImageFirebase = ''

    const random = Math.random();

    const handleEditUser = async (e) => {
        e.preventDefault();
        // const storage = getStorage();
        // if(image != null){
        //     const storageRef = ref(storage, image.name + random);
    
        //     let snapshot =  await uploadBytes(storageRef, image)
        //     urlImageFirebase = await getDownloadURL(snapshot.ref)
        // }

        if(status === " "){
            Swal.fire({
                title: 'Error',
                text: "Please choose status account",
                icon: 'error',
            });
            return;
        }

        const body = new FormData();
        body.append("email", email)
        body.append("status", status)
        // body.append("phone", phone)
        // body.append("gender", gender)
        // body.append("birthday", birthday)
        // body.append("personal-email", personalEmail)
        // body.append("personal-email-hidden", "ACTIVE")
        // body.append("phone-hidden", "ACTIVE")
        // body.append("gender-hidden", "ACTIVE")
        // body.append("birthday-hidden", "ACTIVE")
        // body.append("avatar", urlImageFirebase)

        postMethod('manager/home/edit-status', body)
            .then((res) => {
                setShowEdit(false)
                if (res == true) {
                    // setProducts([...products, res.product]);
                    Swal.fire({
                        title: 'Success',
                        text: 'Edit status account successfully',
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

    return (
    <>
        <div className={cx('container')}>
            <h1>Quản Lý Người Dùng</h1>
            <div className={cx('wrapper')}>
                <table className={cx('table-users')}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, index) => {
                            let param = `/manager/user_information/${item.email}`
                            return(
                            <tr key={index}>
                                <td>
                                    {item.name}
                                </td>
                                <td className={cx('job-title')}>
                                    {item.gender}
                                </td>
                                <td>{item.phone}</td>
                                <td>
                                    <Link
                                        to={param}
                                        className={cx('btn-view', 'text-success')}
                                        // onClick={handleShowView}
                                        // data-name={item.name}
                                        // data-gender={item.gender}
                                        // data-phone={item.phone}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to=""
                                        className={cx('btn-edit', 'text-primary')}
                                        onClick={handleShowEdit}
                                        data-email={item.email}
                                        data-gender={item.gender}
                                        data-phone={item.phone}
                                        data-birthday={item.birthday}
                                        data-personalemail={item.personalEmail}
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Status Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type="text" className={cx('form-control')} name="reportid" readOnly value={email} />
                </div>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='status'>Status</label>
                    <select id="status" className={cx('form-control')} name="status" onChange={(e) => setStatus(e.target.value)}>
                        <option value=" ">Choose Status</option>
                        <option value="INACTIVE">INACTIVE</option>
                        <option value="ACTIVE">ACTIVE</option>
                    </select>
                </div>
                {/* <div className={cx('form-group','mb-3')}>
                    <label htmlFor='gender'>Gender</label>
                    <select id="gender" className={cx('form-control')} name="gender" onChange={(e) => setGender(e.target.value)}>
                        <option value=" ">Choose Gender</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='birthday'>Birthday</label>
                    <input id='birthday' type="date" className={cx('form-control')} name="reportid" value={birthday} onChange={(e) => setBirthday(e.target.value)}/>
                </div>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='phone'>Phone</label>
                    <input id='phone' type="text" className={cx('form-control')} name="reportid" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='personal-email'>Personal Email</label>
                    <input id='personal-email' type="text" className={cx('form-control')} name="reportid" value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)}/>
                </div>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='avatar'>Personal Email</label>
                    <input id='avatar' type="file" className={cx('form-control')} onChange={(e) => setImage(e.target.files[0])} />
                </div> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default User;
