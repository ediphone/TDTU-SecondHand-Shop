import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useContext} from 'react';
import Swal from 'sweetalert2';

import styles from './Home.module.scss';
import { postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    const state = useContext(GlobalState);
    const [accounts, setAccounts] = state.AccountAPI.accounts;

    console.log("Accounts:", accounts)

    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    // const [idEdit, setIdEdit] = useState('');

    const handleCloseView = () => setShowView(false);

    const handleShowView = (e) => {
        setEmail(e.target.getAttribute('data-email'));
        setRole(e.target.getAttribute('data-role'));
        setStatus(e.target.getAttribute('data-status'));
        setShowView(true);
    };

    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (e) => {
        setEmail(e.target.getAttribute('data-email'));
        setRole(e.target.getAttribute('data-role'));
        setStatus(e.target.getAttribute('data-status'));
        // setIdEdit(e.target.getAttribute('data-id'))
        setShowEdit(true);
    };

    const setRoleAccount = (e) => {
        setRole(e.target.value);
    };

    const setStatusAccount = (e) => {
        setStatus(e.target.value);
    };

    //Sửa dữ liệu 
    const handleEditAccount = () => {
        const body = new FormData()
        body.append("email", email)
        body.append("role", role)
        body.append("status", status)
        postMethod('admin/home/edit', body)
            .then((res) => {
                setShowEdit(false);
                if (res) {
                    setAccounts(res)
                    Swal.fire({
                        title: 'Success',
                        text: 'Update account successfully',
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

    // Search
    const [search, setSearch] = useState([])

    const setSearchContent = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const body = new FormData(e.target)
        // body.append("string", search)
        postMethod('admin/account/search', body)
            .then((res) => {
                console.log("Account search", res)
                setAccounts(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
    <>
        <div className={cx('container')}>
            <h1>Quản Lý Tài Khoản</h1>
            <div className={cx('wrapper')}>
                <form className={cx('search-box')} onSubmit={handleSearch}>
                    <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')}/></button>
                    <input type="text" onChange={setSearchContent} name="string" placeholder='Search account...'/>
                </form>
                <table className={cx('table-users')}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((item, index) => (
                            <tr>
                                <td>
                                    {item.email}
                                </td>
                                <td className={cx('job-title')}>
                                    {item.role}
                                </td>
                                <td>{item.status == 'ACTIVE' ? <div className={cx('bg-success')}>{item.status}</div> : <div className={cx('bg-danger')}>{item.status}</div>}</td>
                                <td>
                                    <Link
                                        to=""
                                        className={cx('btn-view')}
                                        onClick={handleShowView}
                                        data-email={item.email}
                                        data-role={item.role}
                                        data-status={item.status}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to=""
                                        className={cx('btn-edit')}
                                        onClick={handleShowEdit}
                                        data-email={item.email}
                                        data-role={item.role}
                                        data-status={item.status}
                                        // data-id={item.id}
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <Modal show={showView} onHide={handleCloseView}>
            <Modal.Header closeButton>
            <Modal.Title>View Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className={cx('form-group','mb-3')}>
                    <p>Email: <b>{email}</b></p>
                </div>
                <div className={cx('form-group','mb-3')}>
                    <p>Role: <i>{role}</i></p>
                </div>
                <div className={cx('form-group')}>
                    <p>Status: {status == 'ACTIVE' ? <span className={cx('text-success')}>{status}</span> : <span className={cx('text-danger')}>{status}</span>}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseView}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('form-group', 'mb-3')}>
                    <label>Email</label>
                    <input name="email" value={email} readOnly className={cx('form-control')}/>
                </div>
                <div className={cx('form-group', 'mb-3')}>
                    <label>Role</label>
                    <select onChange={setRoleAccount} name="role" className={cx('form-control')}>
                        <option>Choose Role</option>
                        <option>USER</option>
                        <option>MANAGER</option>
                        <option>ADMIN</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <label>Status</label>
                    <select onChange={setStatusAccount} name="status" className={cx('form-control')}>
                        <option>Choose Status</option>
                        <option>ACTIVE</option>
                        <option>INACTIVE</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
                Close
            </Button>
            <Button variant="primary" onClick={handleEditAccount}>
                Edit
            </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default Home;
