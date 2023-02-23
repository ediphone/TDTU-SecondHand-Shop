import { useState, useEffect } from 'react';
import { getMethodParam } from '../utils/fetchData';

function SellAPI() {
    // let email = JSON.parse(localStorage.getItem(TOKEN_NAME)).email
    let email = '51900725@student.tdtu.edu.vn'
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            let response = await getMethodParam('user/sell', 'email', email);
            return response
        };
        getPosts()
            .then((res) => {
                console.log("Res in context", res)
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

export default SellAPI;
