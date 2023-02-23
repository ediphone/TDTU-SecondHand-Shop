import classNames from 'classnames/bind';

import styles from './LayoutAdmin.module.scss';
import SidebarAdmin from '~/components/SidebarAdmin';

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
    return (
        <div>
            <SidebarAdmin />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default LayoutAdmin;
