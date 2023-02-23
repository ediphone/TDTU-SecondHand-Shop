import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode';
import axios from 'axios';

import styles from './Login.module.scss';
import { postMethod } from '../../utils/fetchData';
import { GlobalState } from '../../context/GlobalState';
import { TOKEN_NAME } from '../../credentials';
import google from '~/assets/images/google.jpg';

const cx = classNames.bind(styles);

function Login() {
    let navigate = useNavigate();
    const state = useContext(GlobalState);
    const [isLogin, setIsLogin] = state.LoginAPI.isLogin

    // const [showPassword, setShowPassword] = useState(false);
    // const [user, setUser] = useState({ username: '', password: '' });
    // const handleChangeInput = (e) => {
    //     setUser({
    //         ...user,
    //         [e.target.name]: e.target.value,
    //     });
    // };
    // const { login } = state.UserAPI;
    // const { admin } = state.UserAPI;
    // const [isLogin, setIsLogin] = login;
    // const [isAdmin, setIsAdmin] = admin;
    // console.log(user);
    // const handleLogin = () => {
    //     postMethod('login', user)
    //         .then((response) => {
    //             console.log(response);
    //             if (response.success) {
    //                 localStorage.setItem(TOKEN_NAME, response.token);
    //                 if (response.user.role === 'admin') {
    //                     // setIsLogin(true);
    //                     // setIsAdmin(true);
    //                     navigate('/admin');
    //                 } else {
    //                     // setIsLogin(true);
    //                     navigate('/');
    //                 }
    //             } else {
    //                 Swal.fire({
    //                     title: 'Error',
    //                     text: response.message,
    //                     icon: 'error',
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             Swal.fire({
    //                 title: 'Error',
    //                 text: 'Invalid Username Or Password',
    //                 icon: 'error',
    //             });
    //         });
    // };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (user.username.trim() === '') {
    //         Swal.fire({
    //             title: 'Error',
    //             text: 'Username can not be empty',
    //             icon: 'error',
    //         });
    //         return;
    //     }
    //     if (user.password.trim() === '') {
    //         Swal.fire({
    //             title: 'Error',
    //             text: 'Password can not be empty',
    //             icon: 'error',
    //         });
    //         return;
    //     }
    //     handleLogin();
    // };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`,
                    },
                });

                if (res.data.email.includes('@student.tdtu.edu.vn')) {
                    // console.log(res.data.email, res.data.name)
                    const body = new FormData();
                    body.append("email", res.data.email)
                    body.append("name", res.data.name)
                    postMethod('check-login', body)
                        .then((response) => {
                            console.log("RESPONSE IS: ", response);
                            localStorage.setItem(TOKEN_NAME, JSON.stringify(res.data));
                            setIsLogin(true);
                            if (response == 'ADMIN') {
                                    // setIsLogin(true);
                                    // setIsAdmin(true);
                                navigate('/admin/home');
                                return;
                            } else if(response == 'MANAGER') {
                                // setIsLogin(true);
                                navigate('/manager/home');
                                return;
                            }
                            else if(response == 'USER') {
                                // setIsLogin(true);
                                navigate('/home');
                                return;
                            }
                            else {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Account not exists',
                                    icon: 'error',
                                });
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Has orrcured error',
                                icon: 'error',
                            });
                        });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Vui lòng chọn email sinh viên TDTU',
                        icon: 'error',
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <div className={cx('container')}>
            <div className={cx('container__left')}>
                <h1>tdtu secondhand shop</h1>
            </div>
            <div className={cx('container__right')}>
                <div className={cx('container__right-wrapper')}>
                    <h2>Log in</h2>
                    <button onClick={loginWithGoogle}>
                        <img src={google} alt="google" className={cx('icon__google')} />
                        <span>Login with TDTU email</span>
                    </button>
                    {/* <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            // console.log(credentialResponse);
                            var decoded = jwt_decode(credentialResponse.credential);
                            console.log(decoded)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default Login;
