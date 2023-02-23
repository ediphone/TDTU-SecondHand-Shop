import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './User.module.scss';
import Avatar from '~/components/Avatar'
import { getMethodParam } from '~/utils/fetchData';


const cx = classNames.bind(styles);

function User({email, timeCreate}) {
    const [user, setUser] = useState({}) 

    let timeCreated = timeCreate.split("T")
    console.log(timeCreated)

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
        
    },[])

    return (
        <>
            <div className={cx('wrapper__content-avatar')}>
                <Avatar src={user.avatar} alt="" />
                <div>
                    <p>{user.name}</p>
                    <div className={cx('wrapper__content-time')}>
                        <span>{timeCreated[1].split('.')[0].split(":")[0] + ':' + timeCreated[1].split('.')[0].split(":")[1] }</span>
                        <span>{timeCreated[0].split('-')[2] + '/' + timeCreated[0].split('-')[1] + '/' + timeCreated[0].split('-')[0] }</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;
