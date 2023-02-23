import { useState, useEffect } from 'react';
import { getMethod } from '../utils/fetchData';

function AccountAPI() {
    const [accounts, setAccounts] = useState([]);
    // const [productsShow, setProductsShow] = useState([])
    useEffect(() => {
        const getAccounts = async () => {
            let response = await getMethod('admin/home');
            return response;
        };
        getAccounts()
            .then((res) => {
                console.log("Res in context", res)
                // if (res.success) {
                //     setPosts(res.post);
                // }
                setAccounts(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return {
        accounts: [accounts, setAccounts],  
    };
}

export default AccountAPI;
