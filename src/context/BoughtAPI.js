import { useState, useEffect } from 'react';
import { getMethodParam } from '../utils/fetchData';
import { TOKEN_NAME } from '~/credentials';

function BoughtAPI() {
    let email = ''
    if(localStorage.getItem(TOKEN_NAME)){
        email = JSON.parse(localStorage.getItem(TOKEN_NAME)).email
    }
    // let email = '51900725@student.tdtu.edu.vn'
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(email){
            const getPosts = async () => {
                let response = await getMethodParam('user/bought', 'email', email);
                return response;
            };
            getPosts()
                .then((res) => {
                    console.log("Res in context bought", res)
                    setPosts(res)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [email]);

    return {
        posts: [posts, setPosts],
        // productsShow: [productsShow, setProductsShow],
    };
}

export default BoughtAPI;
