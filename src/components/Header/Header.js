import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
//import HeadlessTippy from '@tippyjs/react/headless';

//import { Wrapper as PopperWrapper } from '~/components/Popper';
import { GlobalState } from '~/context/GlobalState';
import styles from './Header.module.scss';
// import Search from '../Search';
// import Auth from '../Auth';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const state = useContext(GlobalState);
    const isLogin = state.UserAPI.login[0];

    const handleSwitchRegister = () => {
        setShowModalLogin(false);
        setShowModalRegister(true);
    };

    const handleSwitchLogin = () => {
        setShowModalLogin(true);
        setShowModalRegister(false);
    };

    const createModalLogin = () => {
        setShowModalLogin(true);
    };

    const createModalRegister = () => {
        setShowModalRegister(true);
    };

    const hideModal = () => {
        setShowModalLogin(false);
        setShowModalRegister(false);
    };

    const hanleClickCart = (e) => {
        e.preventDefault();
        if (!isLogin) {
            Swal.fire({
                title: 'Error',
                text: 'Please login to continue',
                icon: 'error',
            });
            return;
        }
        navigate('/cart');
    };

    return (
        <>
            {/* <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link to="/" className={cx('logo-link')}>
                        <img
                            src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png"
                            alt="Tiki"
                        />
                        <img
                            src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png"
                            alt="FreeShip"
                        />
                    </Link>
                    <div className={cx('search-cart')}>
                        <Search />
                        <Auth onClickLogin={createModalLogin} onClickRegister={createModalRegister} />
                        <div className={cx('cart')}>
                            <Link to="/cart" className={cx('cart-top')} onClick={hanleClickCart}>
                                <div className={cx('cart-wrap')}>
                                    <FontAwesomeIcon icon={faCartShopping} className={cx('icon-cart')} />
                                    <span className={cx('cart-badget')}>4</span>
                                </div>
                                <p>Giỏ Hàng</p>
                            </Link>
                            <div className={cx('cart-bottom')}>
                                <FontAwesomeIcon icon={faHouse} className={cx('icon-house')} />
                                Bán hàng cùng tiki
                            </div>
                        </div>
                    </div>
                </div>
            </header> */}

            {showModalLogin && (
                <div className={cx('modal', 'modal-login')}>
                    <div className={cx('modal-overlay')} onClick={hideModal}></div>
                    <div className={cx('modal-body')}>
                        <div className={cx('auth-form')}>
                            <div className={cx('auth-form-container')}>
                                <div className={cx('auth-form-header')}>
                                    <h3 className={cx('auth-form-heading')}>Đăng nhập</h3>
                                    <span className={cx('auth-form-switch')} onClick={handleSwitchRegister}>
                                        Đăng kí
                                    </span>
                                </div>
                                <div className={cx('auth-form-form')}>
                                    <div className={cx('auth-form-group')}>
                                        <input
                                            type="text"
                                            className={cx('auth-form-input')}
                                            placeholder="Username của bạn"
                                            name="username"
                                            id="username-login"
                                        />
                                    </div>
                                    <div className={cx('auth-form-group')}>
                                        <input
                                            type="password"
                                            className={cx('auth-form-input')}
                                            placeholder="Password của bạn"
                                            name="password"
                                            id="password-login"
                                        />
                                    </div>
                                </div>
                                <div className={cx('auth-form-controls')}>
                                    <button className={cx('btn-back')} onClick={hideModal}>
                                        TRỞ LẠI
                                    </button>
                                    <button className={cx('btn-login')}>ĐĂNG NHẬP</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModalRegister && (
                <div className={cx('modal', 'modal-register')}>
                    <div className={cx('modal-overlay')} onClick={hideModal}></div>
                    <div className={cx('modal-body')}>
                        <div className={cx('auth-form')}>
                            <div className={cx('auth-form-container')}>
                                <div className={cx('auth-form-header')}>
                                    <h3 className={cx('auth-form-heading')}>Đăng kí</h3>
                                    <span className={cx('auth-form-switch')} onClick={handleSwitchLogin}>
                                        Đăng nhập
                                    </span>
                                </div>
                                <div className={cx('auth-form-form')}>
                                    <div className={cx('auth-form-group')}>
                                        <input
                                            type="text"
                                            className={cx('auth-form-input')}
                                            placeholder="Vui lòng nhập username"
                                            name="username"
                                            id="username-register"
                                        />
                                    </div>
                                    <div className={cx('auth-form-group')}>
                                        <input
                                            type="password"
                                            className={cx('auth-form-input')}
                                            placeholder="Vui lòng nhập password"
                                            name="password"
                                            id="password-register"
                                        />
                                    </div>
                                    <div className={cx('auth-form-group')}>
                                        <input
                                            type="password"
                                            className={cx('auth-form-input')}
                                            placeholder="Vui lòng nhập lại password"
                                            name="re-password"
                                            id="re-password-register"
                                        />
                                    </div>
                                </div>
                                <div className={cx('auth-form-controls')}>
                                    <button className={cx('btn-back')} onClick={hideModal}>
                                        TRỞ LẠI
                                    </button>
                                    <button className={cx('btn-login')}>ĐĂNG KÍ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
