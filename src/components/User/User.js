import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './User.module.scss';
import Avatar from '~/components/Avatar'
import { getMethodParam } from '~/utils/fetchData';


const cx = classNames.bind(styles);

function User({email, timeCreate, link}) {
    const [user, setUser] = useState({}) 

    let timeCreated = timeCreate.split("T")

    useEffect(() => {
        const getProfile = async () => {
            let response = await getMethodParam('user/profile', 'email', email)
            return response;
        };
        getProfile()
            .then((res) => {
                setUser(res)
            })
            .catch((err) => {
                console.log(err);
            });
        
    },[email])

    let param = `${link}${user.email}`

    return (
        <div className={cx('posts__header-left')}>
            <Avatar src={user.avatar} alt="" className={cx('posts__header-img')} />
            <div className={cx('posts__header-left-avatar')}>
                <Link
                    className={cx('p')}
                    to={param}
                >{user.name}
                </Link>
                <p>{timeCreated[0].split('-')[2] + '/' + timeCreated[0].split('-')[1] + '/' + timeCreated[0].split('-')[0] }</p>
            </div>
        </div>
    );
}

export default User;
