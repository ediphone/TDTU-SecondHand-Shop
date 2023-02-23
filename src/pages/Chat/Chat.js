import { faPaperPlane, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import styles from './Chat.module.scss';
// import { useState, useEffect } from 'react';

// import { getMethod } from '~/utils/fetchData';
import avatar from '~/assets/images/avatar_post.jpg';

const cx = classNames.bind(styles);

function Chat() {
    return (
        <>
            <div className={cx('container')}>
                <label htmlFor="navbar__mobile-header" className={cx('navigation__mobile')}>
                    <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
                </label>
                <div className={cx('container__left')}>
                    <h3>Your contacts</h3>
                    <div className={cx('container__left-item')}>
                        <img src={avatar} alt="" />
                        <p>Trần Thái Bảo</p>
                        <p>Online</p>
                    </div>
                    <div className={cx('container__left-item')}>
                        <img src={avatar} alt="" />
                        <p>Trần Thái Bảo</p>
                        <p>Online</p>
                    </div>
                    <div className={cx('container__left-item')}>
                        <img src={avatar} alt="" />
                        <p>Trần Thái Bảo</p>
                        <p>Online</p>
                    </div>
                </div>
                <div className={cx('container__right')}>
                    <div className={cx('container__right-wrapper')}>
                        <div className={cx('container__right-chat')}>
                            <div className={cx('container__right-header')}>
                                <img src={avatar} alt="" />
                                <div>
                                    <p>Trần Thái Bảo</p>
                                    <p>Online</p>
                                </div>
                            </div>
                            <div className={cx('holder')}>
                                <div className={cx('content')}>Hello</div>
                            </div>
                            <div className={cx('holder-me')}>
                                <div className={cx('content')}>Hello</div>
                            </div>
                            <div className={cx('holder')}>
                                <div className={cx('content')}>What your name ?</div>
                            </div>
                            <div className={cx('holder-me')}>
                                <div className={cx('content')}>My name is Bao</div>
                            </div>
                            <div className={cx('holder-me')}>
                                <div className={cx('content')}>How are you ?</div>
                            </div>
                            <div className={cx('holder')}>
                                <div className={cx('content')}>I'm fine thank you and you</div>
                            </div>
                            <div className={cx('holder-me')}>
                                <div className={cx('content')}>I'm fine thanks</div>
                            </div>
                        </div>
                        <div className={cx('container__right-send')}>
                            <input type="text" placeholder="Type here........" />
                            <button>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
