import {
    faBars,
    faChevronDown,
    faEllipsis,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';

import styles from './Home.module.scss';
import { getMethodParam, postMethod } from '~/utils/fetchData';
import avatar from '~/assets/images/avatar_post.jpg';
import { GlobalState } from '~/context/GlobalState';
import { TOKEN_NAME } from '~/credentials';
import Slider from '~/components/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { current_user } from '~/redux/selector';
import { HomeSlide } from './HomeSlider';
import User from '~/components/User';
import UserDetail from '~/components/UserDetail';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const state = useContext(GlobalState);

    const curr_user = useSelector(current_user)
    let email = JSON.parse(localStorage.getItem(TOKEN_NAME)).email;

    const dispatch = useDispatch()
    const [posts, setPosts] = useState([]);
    const name = JSON.parse(localStorage.getItem(TOKEN_NAME)).name
    useEffect(() => {
        const getPosts = async () => {
            // let response = await getMethodParam('user/home', 'email', '51900444@student.tdtu.edu.vn');
            let response = await getMethodParam('user/home', 'email', email);
            
            dispatch(HomeSlide.actions.addUser({name: name, email: email}))
            return response;
        };
        getPosts()
            .then((res) => {
                console.log("Pots Home", res)
                setPosts(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(curr_user)
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
        setDescription('');
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

    // Filter
    const [types, setTypes] = state.TypeAPI.types

    const setTypePost =(e) => {
        setType(e.target.value)
    }

    const handleFilter = (e) => {
        const body = new FormData()
        body.append("email", email)
        body.append("typeid", type)
        postMethod('user/filter', body)
            .then((res) => {
                console.log("Post filter", res)
                setPosts(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Report Post
    const [showReport, setShowReport] = useState(false);

    const handleShowReport = (e) => {
        setPostId(e.target.getAttribute('data-postid'));
        // setDescription(e.target.getAttribute('data-description'));
        setShowReport(true);
    };

    const handleCloseReport = (e) => {
        setShowReport(false);
    }

    const handleReportPost = (e) => {
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
        body.append("email", email)
        body.append("postid", postid)
        body.append("description", description)
        postMethod('user/post-report/report', body)
            .then((res) => {
                setShowReport(false)
                if (res == true) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Report post successfully',
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
                <div className={cx('header')}>
                    <div className={cx('')}>
                        <label htmlFor="navbar__mobile-header">
                            <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
                        </label>
                    </div>
                    <select onChange={setTypePost} name="type" className={cx('header__item')}>
                        <option>Choose Type</option>
                        {types.map((item, index) => (
                            <option key={index}>{item.typeID}</option>
                        ))}
                    </select>
                    <button className={cx('header__button')} onClick={handleFilter}>Search</button>
                </div>
                <div className={cx('content')}>
                {posts.length >0 && posts.map((item, index) => (
                    <div className={cx('posts')} key={index}>
                        <div className={cx('posts__header')}>
                            {/* <div className={cx('posts__header-left')}>
                                <img src={avatar} alt="" className={cx('posts__header-img')} />
                                <div className={cx('posts__header-left-avatar')}>
                                    <p>Trần Thái Bảo</p>
                                    <p>8/10/2022</p>
                                </div>
                            </div> */}
                            <User email={item.emailShop} timeCreate={item.timeCreated} link='/user_information/'/>
                            <div className={cx('posts__header-right')}>
                                {/* <div className={cx('header__item-icon')}>
                                    <FontAwesomeIcon icon={faEllipsis}/>
                                </div>
                                <div className={cx('header__right-button')} >
                                    <div className={cx('posts__button-link','text-danger')}
                                    data-postid={item.postID}
                                    data-description={item.description}
                                    onClick={handleShowReport}
                                    >
                                        Report Post
                                    </div>
                                </div> */}
                                <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">
                                                <div 
                                                    className={cx('posts__button-link','text-primary')}
                                                    data-postid={item.postID}
                                                    data-description={item.description}
                                                    onClick={handleShowReport}
                                                >
                                                    Report Post
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <Slider postid={item.postID} />
                        <div 
                            className={cx('posts__content')} 
                        >
                            <p 
                                className={cx('posts__title')}
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
                                {item.title}
                            </p>
                            <p>Price : <i>{item.price}</i> VND</p>
                            <p dangerouslySetInnerHTML={{__html: item?.description}}></p>
                            <p>Type: <i className={cx('post__type', 'text-primary')}>{item.type}</i></p>
                            <p>Status: {item.status == 'SELLING' ? <i className={cx('text-success')}>{item.status}</i> : <i className={cx('text-danger')}>{item.status}</i>}</p>
                        </div>
                        {/* <div className={cx('posts__button')}>
                            <p className={cx('posts__button-link')} 
                            onClick={handleShowPostDetail}
                            data-title={item.title}
                            data-price={item.price}
                            data-postid={item.postID}
                            data-description={item.description}
                            data-timecreated={item.timeCreated}
                            data-emailshop={item.emailShop}
                            data-status={item.status}
                            data-type={item.type}>View Detail</p>
                        </div> */}
                    </div>
                ))} 
                </div>
                {/* <div className={cx('posts')}>
                        <div className={cx('posts__header')}>
                            <div className={cx('posts__header-left')}>
                                <img src={avatar} alt="" className={cx('posts__header-img')} />
                                <div className={cx('posts__header-left-avatar')}>
                                    <p>Trần Thái Bảo</p>
                                    <p>8/10/2022</p>
                                </div>
                            </div>
                            <div className={cx('posts__header-right')}>
                                <div className={cx('header__item-icon')}>
                                    <FontAwesomeIcon icon={faEllipsis}/>
                                </div>
                                <div className={cx('header__right-button')} >
                                    <div className={cx('posts__button-link','text-danger')} 
                                    >
                                        Report Post
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to= "" className={cx('posts__img')}><img src="/images/hp.jpg" alt="" onClick={handleShowPostDetail}/></Link>
                        <div className={cx('posts__content')}>
                            <p className={cx('posts__title')}>Quan Ao Moi Levents</p>
                            <p>Price : 80.000 VND</p>
                            <p>Ao Quan Moi Cuc Xin</p>
                            <p>Type: #QUANAO</p>
                        </div>
                        
                </div> */}
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
                                        <Link to="/chat"><button className={cx('btn-chat')}>Chat With Seller</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        <Modal show={showReport} onHide={handleCloseReport}>
            <Modal.Header closeButton>
            <Modal.Title>Report Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='postid'>PostID</label>
                    <input id='postid' type="text" className={cx('form-control')} name="postid" readOnly value={postid} />
                </div>
                <div className={cx('form-group','mb-3')}>
                    <label htmlFor='email'>Email</label>
                    <input id="email" type="text" className={cx('form-control')} name="email" readOnly value={email} />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor='description'>Description</label>
                    <input id="description" type="text" value={ description } className={cx('form-control')} name="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReport}>
                Close
            </Button>
            <Button variant="danger" onClick={handleReportPost}>
                Report
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default Home;

