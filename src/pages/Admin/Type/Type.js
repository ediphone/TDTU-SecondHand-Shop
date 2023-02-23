import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';
import {useState, useContext} from  'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import Swal from 'sweetalert2';

import styles from './Type.module.scss';
import { postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function Type() {
    const state = useContext(GlobalState);
    const [types, setTypes] = state.TypeAPI.types;

    const [showView, setShowView] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [name, setName] = useState('');
    const [typeid, setTypeid] = useState('');

    // View
    const handleCloseView = () => setShowView(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setTypeid(e.target.getAttribute('data-typeid'))
        setShowView(true);
    };

    // Add
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowAdd = (e) => {
        setShowAdd(true);
    };

    const handleAddType = (e) => {
        const body = new FormData()
        body.append("typeid", typeid)
        body.append("name", name)
        postMethod('admin/type/add', body)
            .then((res) => {
                setShowEdit(false);
                if (res) {
                    setShowAdd(false)
                    setTypes(res)
                    Swal.fire({
                        title: 'Success',
                        text: 'Add type successfully',
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

    // Edit
    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (e) => {
        setName(e.target.getAttribute('data-name'));
        setTypeid(e.target.getAttribute('data-typeid'))
        setShowEdit(true);
    };

    const handleEditType = (e) => {
        const body = new FormData()
        body.append("typeid", typeid)
        body.append("name", name)
        postMethod('admin/type/edit', body)
            .then((res) => {
                setShowEdit(false);
                if (res) {
                    setShowEdit(false)
                    setTypes(res);
                    Swal.fire({
                        title: 'Success',
                        text: 'Edit type successfully',
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

    // Delete
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete = (e) => {
        setName(e.target.getAttribute('data-name'));
        setTypeid(e.target.getAttribute('data-typeid'))
        setShowDelete(true);
    };

    const handleDeleteType = (e) => {
        const body = new FormData()
        body.append("typeid", typeid)
        postMethod('admin/type/delete', body)
            .then((res) => {
                setShowDelete(false);
                if (res) {
                    setShowDelete(false)
                    setTypes(res)
                    Swal.fire({
                        title: 'Success',
                        text: 'Delete type successfully',
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
            <h1>Quản Lý Danh Muc</h1>
            <Button variant="outline-primary" onClick={handleShowAdd} className={cx('mb-3')}>
                Add Type
            </Button>
            <div className={cx('wrapper')}>
                <table className={cx('table-users')}>
                    <thead>
                        <tr className={cx('text-center')}>
                            <th>TypeID</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.typeID}
                                </td>
                                <td className={cx('job-title')}>
                                    {item.name}
                                </td>
                                <td>
                                    <Link
                                        to=""
                                        className={cx('text-success')}
                                        onClick={handleShowView}
                                        data-name={item.name}
                                        data-typeid={item.typeID}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to=""
                                        className={cx('text-primary')}
                                        onClick={handleShowEdit}
                                        data-name={item.name}
                                        data-typeid={item.typeID}
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to=""
                                        className={cx('text-danger')}
                                        onClick={handleShowDelete}
                                        data-name={item.name}
                                        data-typeid={item.typeID}
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    <Modal show={showView} onHide={handleCloseView} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>View Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={cx('form-group')}>
                <span>TypeID: <b>{typeid}</b></span>
            </div>
            <div className={cx('form-group')}>
                <span>Name: <b>{name}</b></span>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={cx('form-group', 'mb-3')}>
                <label htmlFor='typeid'>TypeID</label>
                <input id='typeid' type="text" className={cx('form-control')} name="typeid" onChange={(e) => setTypeid(e.target.value)}/>
            </div>
            <div className={cx('form-group')}>
                <label htmlFor='name'>Name</label>
                <input id="name" type="text" className={cx('form-control')} name="name" onChange={(e) => setName(e.target.value)}/>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddType}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={cx('form-group', 'mb-3')}>
                <label htmlFor='typeid'>TypeID</label>
                <input id='typeid' value={typeid} type="text" className={cx('form-control')} name="typeid" onChange={(e) => setTypeid(e.target.value)}/>
            </div>
            <div className={cx('form-group')}>
                <label htmlFor='name'>Name</label>
                <input id="name" value={name} type="text" className={cx('form-control')} name="name" onChange={(e) => setName(e.target.value)}/>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditType}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={cx('form-group')}>
                <p>Ban co chac la muon xoa <strong>{name}</strong> khong ?</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteType}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default Type;
