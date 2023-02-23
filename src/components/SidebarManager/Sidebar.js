import {
    faCalendarPlus,
    faCartShopping,
    faCircleUser,
    faCommentDots,
    faFlag,
    faFlagCheckered,
    faHome,
    faMessage,
    faRightFromBracket,
    faSearch,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { GlobalState } from '~/context/GlobalState';
import styles from './Sidebar.module.scss';
import './Sidebar.css';

const cx = classNames.bind(styles);

function Sidebar() {
    const navigate = useNavigate();
    const state = useContext(GlobalState);
    const setIsLogin = state.LoginAPI.isLogin[1];
    // const setIsAdmin = state.UserAPI.admin[1];

    const handleLogout = () => {
        localStorage.clear();
        setIsLogin(false);
        // setIsAdmin(false);
        navigate('/login');
    };
    return (
        <>
            <input type="checkbox" id="navbar__mobile-header" className={cx('nav__input-header')} />
            <label htmlFor="navbar__mobile-header" className={cx('container__header-overlay')}></label>
            <section className={cx('sidebar')}>
                <header>
                    <div className={cx('image-text')}>
                        <div className={cx('text', 'header-text')}>
                            <span className={cx('name')}>TDTU</span>
                            <span className={cx('name')}>Secondhand</span>
                            <span className={cx('name')}>Shop</span>
                        </div>
                    </div>
                </header>
                <div className={cx('sidebar__menu')}>
                    <ul>
                        <li>
                            <NavLink to="/manager/home" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faHome} className={cx('icon')} />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/search" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                                <span>Search</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/user" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                                <span>User</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/chat" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                                <span>Message</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/create_post" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faCalendarPlus} className={cx('icon')} />
                                <span>Create Post</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/post_report" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faFlagCheckered} className={cx('icon')} />
                                <span>Post Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/shop_report" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faFlag} className={cx('icon')} />
                                <span>Shop Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/history" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faCartShopping} className={cx('icon')} />
                                <span>History</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/policy" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faMessage} className={cx('icon')} />
                                <span>Policy</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manager/information" activeclassname={cx('active')}>
                                <FontAwesomeIcon icon={faCircleUser} className={cx('icon')} />
                                <span>My Information</span>
                            </NavLink>
                        </li>
                        <li onClick={handleLogout}>
                            <Link to="">
                                <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Sidebar;
