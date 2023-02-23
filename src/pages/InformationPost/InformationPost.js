import { faStar, faChevronDown, faBars, faEllipsis, faCircleXmark,
    faCaretLeft,
    faCaretRight, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import styles from './InformationPost.module.scss';
import { getMethodParam, postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';
import avatar from '~/assets/images/avatar_post.jpg';
import { TOKEN_NAME } from '~/credentials';
import Slider from '~/components/Slider';
import User from '~/components/User';
import UserDetail from '~/components/UserDetail';

const cx = classNames.bind(styles);

function InformationPost() {
    const state = useContext(GlobalState)
    const [types, setTypes] = state.TypeAPI.types

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

    const [posts, setPosts] = useState([])
    const [avatarUser, setAvatarUser] = useState('')

    const [hide, setHide] = useState(false)
    const [user, setUser] = useState("")

    const showMenu = () => {
        setHide(true)
    }

    useEffect(() => {
        const getPosts = async () => {
            let response = await getMethodParam('user/sell', 'email', email);
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
            const getProfile = async () => {
                let response = await getMethodParam('user/profile', 'email', email)
                return response;
            };
        getProfile()
            .then((res) => {
                setAvatarUser(res.avatar)
                setUser(res)
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

    const [showModalPost, setShowModalPost] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [postid, setPostid] = useState(false);
    const [timeCreated, setTimeCreated] = useState('')
    const [emailShop, setEmailShop] = useState('')

    const hideModalPost = () => {
        setShowModalPost(false);
    };

    const handleShowPostDetail = (e) => {
        setPostid(e.target.getAttribute('data-postid'));
        setTitle(e.target.getAttribute('data-title'));
        setPrice(e.target.getAttribute('data-price'));
        setDescription(e.target.getAttribute('data-description'));
        setType(e.target.getAttribute('data-type'));
        setTimeCreated(e.target.getAttribute('data-timecreated'));
        setEmailShop(e.target.getAttribute('data-emailshop'));
        setShowModalPost(true);
    };

    // Edit
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (e) => {
        setTitle(e.target.getAttribute('data-title'));
        setPrice(e.target.getAttribute('data-price'));
        setDescription(e.target.getAttribute('data-description'));
        setType(e.target.getAttribute('data-type'));
        setPostid(e.target.getAttribute('data-id'));
        setShowEdit(true);
    };

    //Sửa dữ liệu 
    const handleEditPost = () => {
        if(title === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your title",
                icon: 'error',
            });
            return;
        }

        if(price === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your price",
                icon: 'error',
            });
            return;
        }

        if(type === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your type",
                icon: 'error',
            });
            return;
        }

        if(description === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your description",
                icon: 'error',
            });
            return;
        }
        
        const body = new FormData()
        body.append("postid", postid)
        body.append("title", title)
        body.append("price", price)
        body.append("type", type)
        body.append("description", description)
        body.append("email-shop", email)
        postMethod('user/post/edit', body)
            .then((res) => {
                setShowEdit(false);
                if (res) {
                    setPosts(res)
                    Swal.fire({
                        title: 'Success',
                        text: 'Update post successfully',
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
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete = (e) => {
        setPostid(e.target.getAttribute('data-id'));
        setShowDelete(true);
    };

    //Xóa dữ liệu 
    const handleDeletePost = () => {
        const body = new FormData()
        body.append("postid", postid)
        body.append("email", email)
        postMethod('user/post/delete', body)
            .then((res) => {
                setShowDelete(false);
                if (res) {
                    setPosts(res)
                    Swal.fire({
                        title: 'Success',
                        text: 'Delete post successfully',
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

    // Edit Status
    const [showEditStatus, setShowEditStatus] = useState(false);
    const [emailBuy, setEmailBuy] = useState('');

    const handleCloseEditStatus = () => setShowEditStatus(false);

    const handleShowEditStatus = (e) => {
        setPostid(e.target.getAttribute('data-id'));
        setShowEditStatus(true);
    };

    const setEmailBuytPost = (e) => {
        setEmailBuy(e.target.value);
    };

    //Sửa dữ liệu 
    const handleEditStatus = () => {
        const body = new FormData()
        body.append("postid", postid);
        body.append("email-buy", emailBuy);
        body.append("email-shop", email);
        postMethod('user/post/edit/status', body)
            .then((res) => {
                setShowEditStatus(false);
                if (res) {
                    setPosts(res);
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
                        </p>
                    </div>
                </div>
                <div className={cx('container__content')}>
                    <div className={cx('container__wrapper')}>
                        <div className={cx('container__wrapper-header')}>
                            <div>
                                <Link to="/information">Your Information</Link>
                            </div>
                            <div>
                                <Link to="/information_post">Your Post</Link>
                            </div>
                        </div>
                        <div className={cx('container__wrapper-choose')}>
                        </div>
                        <div className={cx('container__wrapper-content')}>
                            <div className={cx('grid', 'wide')}>
                                <div className={cx('row')}>
                                    {posts.length >0 && posts.map((item, index) => (
                                        <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                                        <div className={cx('posts')} key={index}>
                                            <div className={cx('posts__header')}>
                                                <User email={item.emailShop} timeCreate={item.timeCreated} link='/user_information/'/>
                                                <div className={cx('posts__header-right')}>
                                                    {item.status === 'SOLD' ? 
                                                    (<Dropdown>
                                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                           
                                                        </Dropdown.Toggle>

                                                        {/* <Dropdown.Menu>
                                                            <Dropdown.Item href="#">
                                                                <div className={cx('posts__button-link','text-danger')} 
                                                                    onClick={handleShowDelete}
                                                                    data-id={item.postID}
                                                                >
                                                                    Delete Post
                                                                </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item href="#">
                                                                <div className={cx('posts__button-link','text-primary')} 
                                                                    onClick={handleShowEditStatus}
                                                                    data-id={item.postID}
                                                                >
                                                                    Edit Status
                                                                </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item href="#">
                                                                <div className={cx('posts__button-link','text-primary')} 
                                                                    onClick={handleShowEdit}
                                                                    data-id={item.postID}
                                                                    data-title={item.title}
                                                                    data-price={item.price}
                                                                    data-description={item.description}
                                                                    data-type={item.type}
                                                                >
                                                                    Edit Post
                                                                </div>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu> */}
                                                    </Dropdown>) : 
                                                    (<Dropdown>
                                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                           
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#">
                                                                <div className={cx('posts__button-link','text-danger')} 
                                                                    onClick={handleShowDelete}
                                                                    data-id={item.postID}
                                                                >
                                                                    Delete Post
                                                                </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item href="#">
                                                                <div className={cx('posts__button-link','text-primary')} 
                                                                    onClick={handleShowEditStatus}
                                                                    data-id={item.postID}
                                                                >
                                                                    Edit Status
                                                                </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item href="#">
                                                                <div className={cx('posts__button-link','text-primary')} 
                                                                    onClick={handleShowEdit}
                                                                    data-id={item.postID}
                                                                    data-title={item.title}
                                                                    data-price={item.price}
                                                                    data-description={item.description}
                                                                    data-type={item.type}
                                                                >
                                                                    Edit Post
                                                                </div>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>)
                                                    }
                                                </div>
                                            </div>
                                            <Slider postid={item.postID} />
                                            <div className={cx('posts__content')}>
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
                                                <p>Price : {item.price} VND</p>
                                                <p dangerouslySetInnerHTML={{__html: item?.description}}></p>
                                                <p>Type: {item.type}</p>
                                                <p>Status: {item.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
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
                                        <p className={cx('wrapper__content-category')}>Merchandise Type: {type}</p>
                                        <p className={cx('wrapper__content-price')}>{price}</p>
                                        <p className={cx('wrapper__content-description')} dangerouslySetInnerHTML={{__html: description}}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Post */}

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
                        <label>Title</label>
                        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className={cx('form-control')} />
                    </div>
                    <div className={cx('form-group', 'mb-3')}>
                        <label>Price</label>
                        <input name="price" value={price} onChange={(e) => setPrice(e.target.value)} className={cx('form-control')} />
                    </div>
                    <div className={cx('form-group', 'mb-3')}>
                        <label>Type</label>
                        <select onChange={(e) => setType(e.target.value)} name="type" className={cx('form-control')}>
                            <option>Choose Type</option>
                            {types.map((item, index) => (
                                <option key={index}>{item.typeID}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form-group', 'mb-3')}>
                        <label>Description</label>
                        <input name="description" value={description} onChange={(e) => setDescription(e.target.value)} className={cx('form-control')}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditPost}>
                    Edit
                </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Post */}

            <Modal show={showDelete} onHide={handleCloseDelete} aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p>Ban co chac la muon xoa bai dang nay khong ?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeletePost}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditStatus} onHide={handleCloseEditStatus}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group', 'mb-3')}>
                        <label>PostId</label>
                        <input name="postid" value={postid} readOnly className={cx('form-control')}/>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Email Buy</label>
                        <input name="email-buy" value={emailBuy} onChange={setEmailBuytPost} className={cx('form-control')}/>
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

export default InformationPost;
