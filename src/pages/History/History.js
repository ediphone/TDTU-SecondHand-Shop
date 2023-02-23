import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import {
    faBars,
    faCircleXmark,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import { getMethodParam, postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';
import styles from './History.module.scss';
import { TOKEN_NAME } from '~/credentials';
// import User from '~/components/User';
import UserDetail from '~/components/UserDetail';
import Slider from '~/components/Slider';

const cx = classNames.bind(styles);

function History() {
    const state = useContext(GlobalState);
    // const [rate, setRate] = state.RateAPI.rate
    
    const data = JSON.parse(localStorage.getItem(TOKEN_NAME))
    const email = data.email
    const [rate, setRate] = useState(0)

    const getRates = async () => {
        let response = await getMethodParam('user/profile/rate', 'email', email);
        return response;
    };

    let rateArray = []
    let rateNone = []

    for(let i = 0; i < Math.round(rate); i++){
        rateArray.push(i)
    }

    for(let i = 0; i < 5 - Math.round(rate); i++){
        rateNone.push(i)
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            let response = await getMethodParam('user/bought', 'email', email);
            return response;
        };
        getPosts()
            .then((res) => {
                console.log("Res in context", res)
                setPosts(res)
            })
            .catch((err) => {
                console.log(err);
            });
        getRates()
            .then((res) => {
                console.log("RATE", res)
                setRate(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // console.log("Posts is:", posts)

    const [showModalPost, setShowModalPost] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('')
    const [postid, setPostId] = useState('')
    const [timeCreated, setTimeCreated] = useState('')
    const [emailShop, setEmailShop] = useState('')
    const [status, setStatus] = useState('')

    const hideModalPost = () => {
        setShowModalPost(false);
    };

    const handleShowPostDetail = (e) => {
        setPostId(e.target.getAttribute('data-postid'));
        setTitle(e.target.getAttribute('data-title'));
        setPrice(e.target.getAttribute('data-price'));
        setDescription(e.target.getAttribute('data-description'));
        setType(e.target.getAttribute('data-type'));
        setTimeCreated(e.target.getAttribute("data-timecreated"));
        setEmailShop(e.target.getAttribute('data-emailshop'));
        setStatus(e.target.getAttribute("data-status"));
        setShowModalPost(true);
    };

    const [showEdit, setShowEdit] = useState(false);
    // const [rate, setRate] = useState('');
    // const [postid, setPostId] = useState('')


    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (e) => {
        // setEmail(e.target.getAttribute('data-email'));
        setPostId(e.target.getAttribute('data-id'))
        setRate(e.target.getAttribute('data-rate'));
        setShowEdit(true);
    };

    //Sửa dữ liệu 
    const handleEditRate = (e) => {
        e.preventDefault()
        console.log("Rate", rate)
        const body = new FormData()
        body.append("postid", postid)
        body.append("rate", rate)
        body.append("email", email)
        postMethod('user/post/edit/rate', body)
            .then((res) => {
                setShowEdit(false);
                if (res) {
                    setPosts(res)
                    // setRate(res.rate)
                    // for(let i = 0; i < Math.round(rate); i++){
                    //     rateArray.push(i)
                    // }

                    // for(let i = 0; i < 5 - Math.round(rate); i++){
                    //     rateNone.push(i)
                    // }

                    Swal.fire({
                        title: 'Success',
                        text: 'Update rate successfully',
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
            <label htmlFor="navbar__mobile-header" className={cx('navigation__mobile')}>
                <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
            </label>
            <h3 className={cx('container__title')}>Product is bought</h3>
            <div className={cx('container__wrapper')}>
                <div className={cx('grid', 'wide')}>
                    <div className={cx('row')}>
                        <div className={cx('container__wrapper-header')}>
                            <div className={cx('col', 'l-2')}>
                                <p>Name</p>
                            </div>
                            <div className={cx('col', 'l-4')}>
                                <p>Price</p>
                            </div>
                            <div className={cx('col', 'l-2')}>
                                <p>Your rate</p>
                            </div>
                            <div className={cx('col', 'l-4')}>
                                <p>Action</p>
                            </div>
                        </div>
                        {posts.map((item, index) => (
                            <div className={cx('container__wrapper-item')} key={index}>
                                <div className={cx('col', 'l-2')}>
                                    <p>{item.title}</p>
                                </div>
                                <div className={cx('col', 'l-4')}>
                                    <p>{item.price}</p>
                                </div>
                                <div className={cx('col', 'l-2')}>
                                    <p className={cx('start')}>
                                        {/* {rateArray.map((item, index) => (
                                            <FontAwesomeIcon icon={faStar} key={index} className={cx('icon__star')}/>
                                        ))}
                                        {rateNone.length > 0 && rateNone.map((item, index) => (
                                            <FontAwesomeIcon icon={faStar} key={index} className={cx('star__no-color')}/>
                                        ))} */}
                                        {item.rate} 
                                        <FontAwesomeIcon icon={faStar} key={index} className={cx('icon__star')}/>
                                    </p>
                                </div>
                                <div className={cx('col', 'l-4')}>
                                    <button 
                                    onClick={handleShowPostDetail}
                                    data-title={item.title}
                                    data-price={item.price}
                                    data-postid={item.postID}
                                    data-description={item.description}
                                    data-timecreated={item.timeCreated}
                                    data-emailshop={item.emailShop}
                                    data-status={item.status}
                                    data-type={item.type}
                                    >
                                        View 
                                    </button>
                                    <button 
                                    className={cx('btn-edit-confirm')}
                                    onClick={handleShowEdit}
                                    data-id={item.postID}
                                    data-email={item.email}
                                    data-rate={item.rate}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        {showModalPost && (
                <div className={cx('modal__build')}>
                    <div className={cx('modal__overlay')} onClick={hideModalPost}></div>
                    <div className={cx('modal__body')}>
                        <div className={cx('modal__container')}>
                            <div className={cx('wrapper')}>
                                <div className={cx('wrapper__icon')} onClick={hideModalPost}>
                                    <FontAwesomeIcon icon={faCircleXmark} className={cx('wrapper__icon-close')} />
                                </div>
                                <div className={cx('wrapper__content')}>
                                    <div className={cx('wrapper__content-img')}>
                                        <Slider postid={postid}/>
                                    </div>
                                    <div className={cx('wrapper__content-text')}>
                                        <UserDetail email={emailShop} timeCreate={timeCreated} />
                                        <p className={cx('wrapper__content-title')}>{title}</p>
                                        <p className={cx('wrapper__content-category')}>Type: {type}</p>
                                        <p className={cx('wrapper__content-price')}>Price: {price} VND</p>
                                        <p className={cx('wrapper__content-description')} dangerouslySetInnerHTML={{__html: description}}></p>
                                        <p>Status: {status == 'SELLING' ? <i className={cx('text-success')}>{status}</i> : <i className={cx('text-danger')}>{status}</i>}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Posts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group', 'mb-3')}>
                        <label>PostID</label>
                        <input name="postid" value={postid} readOnly className={cx('form-control')} />
                    </div>
                    <div className={cx('form-group', 'mb-3')}>
                        <label>Type</label>
                        <select onChange={(e) => setRate(e.target.value)} name="rate" className={cx('form-control')}>
                            <option>Choose Rate</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditRate}>
                    Edit
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default History;
