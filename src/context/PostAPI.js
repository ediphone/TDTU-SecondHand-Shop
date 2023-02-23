import { useState, useEffect } from 'react';
import { getMethodParam } from '../utils/fetchData';

function PostAPI() {
    const [posts, setPosts] = useState([]);
    // const [productsShow, setProductsShow] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            let response = await getMethodParam('user/home', 'email', '51900444@student.tdtu.edu.vn');
            return response;
        };
        getPosts()
            .then((res) => {
                console.log("Res in context", res)
                // if (res.success) {
                //     setPosts(res.post);
                // }
                setPosts(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        posts: [posts, setPosts],
        // productsShow: [productsShow, setProductsShow],
    };
}

export default PostAPI;
