import { useState, useEffect } from 'react';
import { getMethod } from '../utils/fetchData';
import { TOKEN_NAME } from '../credentials';
function UserAPI() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            let response = await getMethod('admin/user');
            return response;
        };
        getUsers()
            .then((res) => {
                console.log("Res in context", res)
                setUser(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return {
        user: [user, setUser],
    };
}

export default UserAPI;
