import { faChevronDown, faCommentDots, faBars, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Search.module.scss';
import { useState, useEffect } from 'react';

import { postMethod } from '~/utils/fetchData';
import avatar from '~/assets/images/avatar_post.jpg';

const cx = classNames.bind(styles);

function Search() {
    const [user, setUser] = useState([])
    // Search
    const [search, setSearch] = useState([])

    const setSearchContent = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const body = new FormData(e.target)
        // body.append("string", search)
        postMethod('user/search', body)
            .then((res) => {
                console.log("Account search", res)
                setUser(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className={cx('container')}>
                <label htmlFor="navbar__mobile-header" className={cx('navigation__mobile')}>
                    <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
                </label>
                <div className={cx('header')}>
                    <form className={cx('header__search-box')} onSubmit={handleSearch}>
                        <button type="submit"><FontAwesomeIcon icon={faSearch} className={cx('header__search-icon')} /></button>
                        <input type="text" placeholder="Search here..." onChange={setSearchContent} name="string"/>
                    </form>
                </div>
                {user.length > 0 && 
                <>
                    <div className={cx('info')}>
                    {user.map((item, index) => {
                        let param = `/user_information/${item.email}`

                        return (
                            <div className={cx('info__left')}>
                                <img src={avatar} alt="" className={cx('info__left-img')} />
                                <div className={cx('info__left-avatar')}>
                                    <Link to ={param} className={cx('p')}>{item.name}</Link>
                                    <p>{item.email.split('@')[0]}</p>
                                    <p>
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </p>
                                </div>
                            </div>
                        )
                        
                        })}
                    {/* <div className={cx('info__right')}>
                        <div className={cx('info__right-top')}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                        <div className={cx('info__right-bottom')}>
                            <div className={cx('info__right-item')}>
                                <span>Down</span>
                                <FontAwesomeIcon className={cx('info__right-icon')} icon={faChevronDown} />
                            </div>
                            <button className={cx('info__right-button')}>Filter</button>
                        </div>
                    </div> */}
                </div>
                {/* <div className={cx('content')}>
                    <div className={cx('grid', 'wide')}>
                        <div className={cx('row')}>
                            <div className={cx('col', 'l-6', 'm-12')}>
                                <div className={cx('content__item')}></div>
                            </div>
                            <div className={cx('col', 'l-6', 'm-12')}>
                                <div className={cx('content__item')}></div>
                            </div>
                        </div>
                    </div>
                </div> */}
                </>}
            </div>
        </>
    );
}

export default Search;
