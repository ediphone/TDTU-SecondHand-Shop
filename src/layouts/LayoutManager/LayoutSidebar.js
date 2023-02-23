import classNames from 'classnames/bind';

import styles from './LayoutSidebar.module.scss';
import SidebarManager from '~/components/SidebarManager';

const cx = classNames.bind(styles);

function LayoutSidebar({ children }) {
    return (
        <div>
            <SidebarManager />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default LayoutSidebar;
