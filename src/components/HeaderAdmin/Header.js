import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightToBracket,
    faBars,
    faCartShopping,
    faHouse,
    faMoneyBill,
    faProcedures,
    faRightToBracket,
    faStore,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useLocation, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
//import HeadlessTippy from '@tippyjs/react/headless';
//import 'bootstrap/dist/css/bootstrap.min.css';

//import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './HeaderAdmin.module.scss';
// import Search from '../Search';
// import Auth from '../Auth';
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function Header() {
    // const dbRef = ref(getDatabase());
    const [currentUser, setCurrentUser] = useState(false);
    const navigate = useNavigate();
    const state = useContext(GlobalState);
    const setIsLogin = state.UserAPI.login[1];
    const setIsAdmin = state.UserAPI.admin[1];

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        setIsLogin(false);
        setIsAdmin(false);
        navigate('/login');
    };

    return (
        <>
            <header className={cx('wrapper')}>
                
            </header>         
        </>
    );
}

export default Header;
