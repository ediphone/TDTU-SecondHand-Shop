import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';
import { useContext } from  'react';

import styles from './User.module.scss';
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function User() {
    const state = useContext(GlobalState);
    const user = state.UserAPI.user[0];

    return (
    <>
        <div className={cx('container')}>
            <h1>Quản Lý Người Dùng</h1>
            <div className={cx('wrapper')}>
                <table className={cx('table-users')}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, index) => {
                            let param = `/admin/information/${item.email}`
                            return(
                            <tr>
                                <td>
                                    {item.name}
                                </td>
                                <td className={cx('job-title')}>
                                    {item.gender}
                                </td>
                                <td>{item.phone}</td>
                                <td>
                                    <Link
                                        to={param}
                                        className={cx('btn-view')}
                                        // onClick={handleShowView}
                                        // data-name={item.name}
                                        // data-gender={item.gender}
                                        // data-phone={item.phone}
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}

export default User;
