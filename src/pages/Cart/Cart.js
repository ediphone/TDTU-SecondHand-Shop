import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

import { getMethod, postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

let cartProduct = true;

function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.UserAPI.cart;
    const [cartList, setCartList] = useState([]);
    const globalProducts = state.ProductAPI.products[0];

    useEffect(() => {
        const getCart = async () => {
            const res = await getMethod('get-user');
            return res;
        };
        getCart()
            .then((res) => {
                if (res.success) {
                    setCartList(res.user.cart);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: res.message,
                        icon: 'error',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const hanldeCloseModal = () => {
        setShowModal(false);
    };

    let products = [];
    if (cart.length > 0) {
        // setCartProduct(true);
        globalProducts.forEach((product) => {
            cartList.forEach((p) => {
                console.log(p);
                if (p.id === product._id) {
                    products.push({ ...product, quantity: p.quantity });
                }
            });
        });
    }

    let totalPrice = 0;
    products.forEach((product) => {
        totalPrice += Math.floor((product.price - (product.sale / 100) * product.price) * product.quantity);
    });

    const handleDelete = (e) => {
        let id = e.target.getAttribute('data-id');
        postMethod('delete-product', { product_id: id })
            .then((res) => {
                if (res.success) {
                    setCart(res.user.cart);
                    setCartList(res.user.cart);
                    Swal.fire({
                        title: 'Success',
                        text: 'Delete product from cart successfully',
                        icon: 'success',
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: res.message,
                        icon: 'error',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row', 'pt-16')}>
                    <div className={cx('col', 'l-12')}>
                        <span className={cx('cart')}>GIỎ HÀNG</span>
                    </div>
                </div>

                {cartList.length > 0 ? (
                    <>
                        <div className={cx('row', 'pt-16')}>
                            <div className={cx('col', 'l-9')}>
                                <div className={cx('above-product')}>
                                    <input type="checkbox" />
                                    <div className={cx('all-product')}>
                                        Tất cả (<span>1</span> sản phẩm)
                                    </div>
                                    <div className={cx('price-product')}>Đơn giá</div>
                                    <div className={cx('quantity-product')}>Số lượng</div>
                                    <div className={cx('buy-product')}>Thành tiền</div>
                                    <FontAwesomeIcon icon={faTrashCan} className={cx('delete-product')} />
                                </div>
                            </div>
                            <div className={cx('col', 'l-3')}>
                                <div className={cx('sale-code')} onClick={handleShowModal}>
                                    Chọn hoặc nhập khuyến mãi khác
                                </div>
                            </div>
                        </div>
                        <div className={cx('row', 'mt-16')}>
                            <div className={cx('col', 'l-9')}>
                                <div className={cx('row')}>
                                    {products.map((item, index) => (
                                        <div className={cx('col', 'l-12')} key={index}>
                                            <div className={cx('product')}>
                                                <input type="checkbox" />
                                                <div className={cx('product-content')}>
                                                    <img src={item.image_url} alt={item.name} />
                                                    <div className={cx('content')}>
                                                        <h3 className={cx('heading')}>{item.name}</h3>
                                                        <span>
                                                            <span className={cx('owner')}>Apple Company</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={cx('price')}>
                                                    <div className={cx('new-price')}>{item.price} đ</div>
                                                    <div className={cx('old-sale')}>
                                                        <div className={cx('old-price')}>10.023.456 đ</div>
                                                        <div className={cx('sale-price')}>-19%</div>
                                                    </div>
                                                </div>
                                                <div className={cx('quantity')}>
                                                    <button className={cx('sub')}>-</button>
                                                    <button className={cx('current')}>{item.quantity}</button>
                                                    <button className={cx('add')}>+</button>
                                                </div>
                                                <div className={cx('buy-price')}>{item.price * item.quantity} đ</div>
                                                <Link to="" data-id={item._id} onClick={(e) => handleDelete(e)}>
                                                    {/* <FontAwesomeIcon
                                                        icon={faTrashCan}
                                                        className={cx('delete-product')}
                                                    /> */}
                                                    Xóa
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={cx('col', 'l-3')}>
                                <div className={cx('row')}>
                                    <div className={cx('col', 'l-12')}>
                                        <div className={cx('price')}>
                                            <div className={cx('temp')}>
                                                <p>Tạm Tính</p>
                                                <p>{totalPrice} đ</p>
                                            </div>
                                            <div className={cx('separate')}></div>
                                            <div className={cx('buy')}>
                                                <p>Thành Tiền</p>
                                                <div className={cx('buy-price')}>
                                                    <p>{totalPrice} đ</p>
                                                    <p>(Đã bao gồm VAT nếu có)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('row', 'mt-16')}>
                                    <div className={cx('col', 'l-12')}>
                                        <button className={cx('button')}>Tiến Hành Đặt Hàng</button>
                                    </div>
                                </div>

                                <div className={cx('row', 'mt-16')}>
                                    <div className={cx('col', 'l-12')}>
                                        <div className={cx('sale')}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cx('row', 'mt-16')}>
                        <div className={cx('col', 'l-12')}>
                            <div className={cx('no-product')}>
                                <div>
                                    <img
                                        className={cx('no-product-img')}
                                        src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"
                                        alt=""
                                    />
                                    <p className={cx('no-product-text')}>Không có sản phẩm nào để hiển thị</p>
                                    <div className={cx('no-product-btn')}>
                                        <Link to="/">Tiếp tục mua sắm</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <div className={cx('modal')}>
                    <div className={cx('modal__overlay')} onClick={hanldeCloseModal}></div>
                    <div className={cx('modal__body')}>
                        <div className={cx('auth-form')}>
                            <div className={cx('auth-form__container')}>
                                <div className={cx('auth-form__header')}>
                                    <h2>Tiki khuyến mãi</h2>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className={cx('auth-form__header-icon')}
                                        onClick={hanldeCloseModal}
                                    />
                                </div>

                                <div className={cx('auth-form__form')}>
                                    <div className={cx('auth-form__group')}>
                                        <input
                                            type="text"
                                            className={cx('auth-form__input')}
                                            placeholder="Nhập mã giảm giá"
                                        />
                                        <button className={cx('auth-form__btn')}>Áp dụng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
