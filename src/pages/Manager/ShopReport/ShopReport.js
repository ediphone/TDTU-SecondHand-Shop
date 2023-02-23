import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import styles from './ShopReport.module.scss';
import { getMethod, postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';
import { TOKEN_NAME } from '~/credentials';

const cx = classNames.bind(styles);

function ShopReport() {
    const state = useContext(GlobalState);
    const [posts, setPosts] = useState([])
    const email = JSON.parse(localStorage.getItem(TOKEN_NAME)).email

    useEffect(() => {
        const getPosts = async () => {
            let response = await getMethod('manager/shopreport');
            return response;
        };
        getPosts()
            .then((res) => {
                console.log("Shop Report", res)
                setPosts(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [showView, setShowView] = useState(false);

    const [emailShop, setEmailShop] = useState('');
    const [emailReport, setEmailReport] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');

    const handleCloseView = () => setShowView(false);

    const handleShowView = (e) => {
        setEmailReport(e.target.getAttribute('data-emailreport'));
        setEmailShop(e.target.getAttribute('data-emailshop'));
        setStatus(e.target.getAttribute('data-status'));
        setDescription(e.target.getAttribute('data-description'));
        setShowView(true);
    };

    // Edit Status
    const [showEditStatus, setShowEditStatus] = useState(false);
    const [reportid, setReportid] = useState('');

    const handleCloseEditStatus = () => setShowEditStatus(false);

    const handleShowEditStatus = (e) => {
        setReportid(e.target.getAttribute('data-reportid'));
        setStatus(e.target.getAttribute("data-status"))
        setShowEditStatus(true);
    };

    //Sửa dữ liệu 
    const handleEditStatus = (e) => {
        const body = new FormData()
        body.append("reportid", reportid)
        body.append("status", status)
        postMethod('manager/shopreport/edit', body)
            .then((res) => {
                setShowEditStatus(false);
                if (res == true) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Update status successfully',
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
                <h1>Quản Lý Shop Report</h1>
                <div className={cx('wrapper')}>
                    <table className={cx('table-users')}>
                        <thead>
                            <tr>
                                <th>Email Report</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.emailReport}</td>
                                    <td className={cx('job-title')}>
                                        {item.description}
                                    </td>
                                    <td>{item.status == 'UNREAD' ? <div className={'bg-orange'}>{item.status}</div> : <div className={'bg-success'}>{item.status}</div>}</td>
                                    <td>
                                        <Link
                                            to=""
                                            className={cx('btn-outline-success')}
                                            onClick={handleShowView}
                                            data-emailshop={item.emailShop}
                                            data-emailreport={item.emailReport}
                                            data-description={item.description}
                                            data-status={item.status}
                                        >
                                            Xem
                                        </Link>
                                        <Link
                                            to=""
                                            className={cx('btn-outline-primary')}
                                            onClick={handleShowEditStatus}
                                            data-reportid={item.reportID}
                                            data-status={item.status}
                                        >
                                            Sua
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
                <Modal.Title>View Post Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group','mb-3')}>
                        <p>Email Report: <b>{emailReport}</b></p>
                    </div>
                    <div className={cx('form-group','mb-3')}>
                        <p>Email Shop: <b>{emailShop}</b></p>
                    </div>
                    <div className={cx('form-group','mb-3')}>
                        <p>Description: <i>{description}</i></p>
                    </div>
                    <div className={cx('form-group')}>
                        <p>Status: {status == 'DONE' ? <span className={cx('text-success')}>{status}</span> : <span className={cx('text-secondary')}>{status}</span>}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditStatus} onHide={handleCloseEditStatus}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group','mb-3')}>
                        <label htmlFor='reportid'>ReportID</label>
                        <input id='reportid' type="text" className={cx('form-control')} name="reportid" readOnly value={reportid} />
                    </div>
                    <div className={cx('form-group','mb-3')}>
                        <label htmlFor='status'>Status</label>
                        <input id="status" type="text" className={cx('form-control')} name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditStatus}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditStatus}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShopReport;

