import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostReport.module.scss';
import { getMethodParam } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';
import { TOKEN_NAME } from '~/credentials';

const cx = classNames.bind(styles);

function PostReport() {
    const state = useContext(GlobalState);
    const [posts, setPosts] = useState([])
    const email = JSON.parse(localStorage.getItem(TOKEN_NAME)).email

    useEffect(() => {
        const getPosts = async () => {
            let response = await getMethodParam('user/post-report', 'email', email);
            return response;
        };
        getPosts()
            .then((res) => {
                console.log("Post Report", res)
                setPosts(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);


    const [title, setTitle] = useState('');
    const [emailReport, setEmailReport] = useState('');
    const [status, setStatus] = useState('');
    // const [emailShop, setEmailShop] = useState('')
    const [description, setDescription] = useState('');

    const handleCloseView = () => setShowView(false);

    const handleShowView = (e) => {
        setEmailReport(e.target.getAttribute('data-emailreport'));
        setStatus(e.target.getAttribute('data-status'));
        setDescription(e.target.getAttribute('data-description'));
        setShowView(true);
    };

    return (
        <>
            <div className={cx('container')}>
                <h1>Quản Lý Bài Đăng</h1>
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
                                    <td className={cx('job-title')} dangerouslySetInnerHTML={{__html: item?.description}}>
                                    </td>
                                    <td>{item.status == 'UNREAD' ? <div className={'bg-orange'}>{item.status}</div> : <div className={'bg-success'}>{item.status}</div>}</td>
                                    <td>
                                        <Link
                                            to=""
                                            className={cx('btn-outline-success')}
                                            onClick={handleShowView}
                                            data-emailreport={item.emailReport}
                                            data-description={item.description}
                                            data-status={item.status}
                                        >
                                            Xem
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
                <div className={cx('form-group', 'd-flex')}>
                    <label>Description: </label>
                    <p dangerouslySetInnerHTML={{__html: description}}></p>
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
        </>
    );
}

export default PostReport;

