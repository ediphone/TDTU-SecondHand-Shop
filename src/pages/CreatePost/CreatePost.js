import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Editor as EditerTinyMce } from '@tinymce/tinymce-react';
import { useState, useEffect, useRef, useContext } from 'react';
import Swal from 'sweetalert2';
import firebase from "~/firebase"

import styles from './CreatePost.module.scss';
import { TOKEN_NAME } from '~/credentials';
import { postMethod } from '~/utils/fetchData';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function CreatePost() {
    const navigate = useNavigate()
    const state = useContext(GlobalState)
    const [types, setTypes] = state.TypeAPI.types

    const data = JSON.parse(localStorage.getItem(TOKEN_NAME))
    const email = data.email

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    let [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [video, setVideo] = useState(null)

    let urlImageFirebase1 = ''
    let urlImageFirebase2 = ''
    let urlImageFirebase3 = ''
    let urlImageFirebase4 = ''
    const editorRef = useRef(null);

    const random = Math.random();

    //Thêm dữ liệu
    const handleAddPost = async (e) => {
        e.preventDefault();

        const storage = getStorage();
        if(image1 != null){
            const storageRef = ref(storage, image1.name + random);
    
            let snapshot =  await uploadBytes(storageRef, image1)
            urlImageFirebase1 = await getDownloadURL(snapshot.ref)
            // setImage1(urlImageFirebase)
        }

        if(image2 != null){
            const storageRef = ref(storage, image2.name + random);
    
            let snapshot =  await uploadBytes(storageRef, image2)
            urlImageFirebase2 = await getDownloadURL(snapshot.ref)
            // setImage2(urlImageFirebase)
        }

        if(image3 != null){
            const storageRef = ref(storage, image3.name + random);
    
            let snapshot =  await uploadBytes(storageRef, image3)
            urlImageFirebase3 = await getDownloadURL(snapshot.ref)
            // setImage3(urlImageFirebase)
        }

        if(video != null){
            const storageRef = ref(storage, video.name + random);
    
            let snapshot =  await uploadBytes(storageRef, video)
            urlImageFirebase4 = await getDownloadURL(snapshot.ref)
            // setVideo(urlImageFirebase)
        }

        if (editorRef.current) {
            description = editorRef.current.getContent();
        }

        if(title === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your title",
                icon: 'error',
            });
            return;
        }

        if(price === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your price",
                icon: 'error',
            });
            return;
        }

        if(type === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your type",
                icon: 'error',
            });
            return;
        }

        if(description === ''){
            Swal.fire({
                title: 'Error',
                text: "Please enter your description",
                icon: 'error',
            });
            return;
        }

        const body = new FormData();
        body.append("email-shop", email)
        body.append("title", title)
        body.append("price", price)
        body.append("type", type)
        body.append("description", description)
        body.append("image1", urlImageFirebase1)
        body.append("image2", urlImageFirebase2)
        body.append("image3", urlImageFirebase3)
        body.append("video", urlImageFirebase4)

        console.log(email)
        console.log(title)
        console.log(price)
        console.log(type)
        console.log(description)
        console.log(urlImageFirebase1)
        console.log(urlImageFirebase2)
        console.log(urlImageFirebase3)
        console.log(urlImageFirebase4)

        postMethod('user/post/create', body)
            .then((res) => {
                console.log("Res is", res)
                if (res == true) {
                    // setProducts([...products, res.product]);
                    Swal.fire({
                        title: 'Success',
                        text: 'Add post successfully',
                        icon: 'success',
                    }).then((result) => {
                        if (result.isConfirmed) {
                          navigate('/home')
                        } 
                    })
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

    // const editorRef = useRef(null);
    // const log = (e) => {
    //     e.preventDefault()
    //     if (editorRef.current) {
    //     console.log(editorRef.current.getContent());
    //     }
    // };

    return (
        <>
            <div className={cx('container')}>
                <label htmlFor="navbar__mobile-header" className={cx('navigation__mobile')}>
                    <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
                </label>
                <div className={cx('container__header')}>
                    {/* <label htmlFor="navbar__mobile-header">
                        <FontAwesomeIcon className={cx('header__item-icon', 'header__item-mobile')} icon={faBars} />
                    </label> */}
                    <h3 className={cx('container__title')}>Create your post</h3>
                </div>
                {/* <form> */}
                {/* <div className={cx('form')}> */}
                    <form onSubmit={handleAddPost} encType="multipart/form-data">
                        <div className={cx('container__left')}>
                            <div className={cx('container__file')}>
                                <div className={cx('container__file-image')}>
                                    <h3>Upload Image</h3>
                                    <div className={cx('container__file-choose')}>
                                        <input type="file" name="image1" onChange={(e) => setImage1(e.target.files[0])} />
                                    </div>
                                    <div className={cx('container__file-choose')}>
                                        <input type="file" name="image2" onChange={(e) => setImage2(e.target.files[0])} />
                                    </div>
                                    <div className={cx('container__file-choose')}>
                                        <input type="file" name="image3" onChange={(e) => setImage3(e.target.files[0])} />
                                    </div>
                                </div>
                                <div className={cx('container__file-video')}>
                                    <h3>Upload Video</h3>
                                    <div className={cx('container__file-choose')}>
                                        <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('container__right')}>
                            <div className={cx('container__text')}>
                                {/* <div className={cx('container__text-header')}>
                                    <label htmlFor="title">Title</label>
                                    <button className={cx('container__text-sell')}>
                                        <span>sell</span>
                                        Sold
                                    </button>
                                </div> */}
                                <div className={cx('container__form-group', 'd-none')}>
                                    <label htmlFor="email-shop">Email</label>
                                    <input type="hidden" id="email-shop" name="email-shop" value={email} readOnly/>
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)}/>
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label htmlFor="type">Type</label>
                                    <select id="type" name="type" onChange={(e) => setType(e.target.value)}>
                                        <option>Choose Type</option>
                                        {types.map((item, index) => (
                                            <option key={index}>{item.typeID}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label htmlFor="price">Price</label>
                                    <input type="text" id="price" name="price" onChange={(e) => setPrice(e.target.value)}/>
                                </div>
                                <div className={cx('container__form-group')}>
                                    <label htmlFor="description" className={cx('label__des')}>
                                        Description
                                    </label>
                                    {/* <textarea rows="20" id="description" name="description" onChange={(e) => setDescription(e.target.value)}/>  */}
                                    {/* <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
                                    init={{
                                    height: 500,
                                    menubar: false,
                                    // plugins: [
                                    //     'advlist autolink lists link image charmap print preview anchor',
                                    //     'searchreplace visualblocks code fullscreen',
                                    //     'insertdatetime media table paste code help wordcount'
                                    // ],
                                    toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }} */}
                                    <EditerTinyMce
                                        apiKey='yheylvn8zaqz0ctxmvxmbfkq64y5rn318jfbdlh0u9p76lel'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        // onEditorChange={log}
                                        initialValue="This is the initial content of the editor."
                                        init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            "print","preview","paste","importcss","searchreplace","autolink","autosave","save","directionality","code","visualblocks","visualchars","fullscreen","image","link","media","codesample","table","charmap","hr","pagebreak","nonbreaking","anchor","toc","insertdatetime","advlist","lists","wordcount","imagetools","textpattern","noneditable","help","charmap","quickbars","emoticons"
                                        ],
                                        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image media template link anchor codesample | ltr rtl',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        image_caption: true,
                                        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                                        noneditable_noneditable_class: 'mceNonEditable',
                                        contextmenu: 'link image imagetools table',
                                        statusbar: false,
                                        }}
                                    /> 
                                </div>
                                <div className={cx('container__form-group', 'container__form-group-button')}>
                                    <button className={cx('add-post')} type="submit">Add</button>
                                </div>
                            </div>
                        </div>
                    </form>
                {/* </div> */}
            </div>
        </>
    );
}

export default CreatePost;
