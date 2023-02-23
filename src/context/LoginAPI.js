import { useState, useEffect } from 'react';
import { getMethod } from '../utils/fetchData';
import { TOKEN_NAME } from '../credentials';
function LoginAPI() {
    const [isLogin, setIsLogin] = useState(false);
    // useEffect(() => {
    //     const getUsers = async () => {
    //         let response = await getMethod('admin/user');
    //         return response;
    //     };
    //     getUsers()
    //         .then((res) => {
    //             console.log("Res in context", res)
    //             setUser(res)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    return {
        isLogin: [isLogin, setIsLogin] ,
    };
}

export default LoginAPI;
