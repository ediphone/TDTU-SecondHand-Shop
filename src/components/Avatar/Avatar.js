import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState, forwardRef } from 'react';
// import images from '~/assets/images';
import styles from './Avatar.module.scss';
import avatar from '~/assets/images/avatar_post.jpg';

const Avatar = forwardRef(({ src, alt, className, fallback: customFallback = avatar, ...props }, ref) => {
    const [fallback, setFallback] = useState('');
    
    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={src==null ? avatar : src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Avatar;
