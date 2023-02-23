import classNames from 'classnames/bind';

import styles from './LayoutNoneHeader.module.scss';

const cx = classNames.bind(styles);

function LayoutNoneHeader({ children }) {
    return (
        <div>
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

export default LayoutNoneHeader;
