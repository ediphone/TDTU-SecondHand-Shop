import Carousel from 'react-bootstrap/Carousel';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import styles from './Slider.module.scss';
import { getMethodParam } from '~/utils/fetchData';
import Image from '~/components/Image';

const cx = classNames.bind(styles)

function Slider({postid}){
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])

    const getImages = async () => {
        let response = await getMethodParam('user/post/image', 'postid', postid);
        return response;
    };

    const getVideos = async () => {
        let response = await getMethodParam('user/post/video', 'postid', postid);
        return response;
    };

    useEffect(() => {
        getImages()
            .then((res) => {
                // console.log("IMAGES ", res)
                setImages(res)
            })
            .catch((err) => {
                console.log(err);
            });
        getVideos()
            .then((res) => {
                console.log("IMAGES ", res)
                setVideos(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [postid]);
    
    return (
        <Carousel className={cx('mt-8','rounded')}>
            {images.map((item, index) => (
                <Carousel.Item key={index}>
                    <Image
                    className={cx('posts__img')}
                    src={item.link}
                    alt=""
                    />
                </Carousel.Item>
            ))}
            {videos.map((item, index) => (
                <Carousel.Item key={index}>
                <video className={cx('posts__img')} loop autoPlay={true} muted>
                    <source src={item.link} />
                </video>
            </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Slider