import { useState, useEffect } from 'react';
import { getMethod } from '../utils/fetchData';
import { TOKEN_NAME } from '../credentials';
function TypeAPI() {
    const [types, setTypes] = useState([]);
    useEffect(() => {
        const getTypes = async () => {
            let response = await getMethod('admin/type');
            return response;
        };
        getTypes()
            .then((res) => {
                console.log("Res in context", res)
                setTypes(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return {
        types: [types, setTypes],
    };
}

export default TypeAPI;
