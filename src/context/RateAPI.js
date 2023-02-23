import { useState, useEffect } from 'react';
import { getMethodParam } from '../utils/fetchData';
import { TOKEN_NAME } from '../credentials';
function RateAPI() {
    const [rate, setRate] = useState([]);
    const [rateArray, setRateArray] = useState([]);
    const [rateNone, setRateNone] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            let response = await getMethodParam('user/profile/rate', 'email', '51900725@student.tdtu.edu.vn');
            return response;
        };
        getUsers()
            .then((res) => {
                console.log("Res in context", res)
                setRate(res)
                for(let i = 0; i < Math.round(res); i++){
                    rateArray.push(i)
                }
            
                for(let i = 0; i < 5 - Math.round(res); i++){
                    rateNone.push(i)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return {
        rate: [rate, setRate],
        rateArray: [rateArray, setRateArray],
        rateNone: [rateNone, setRateNone]
    };
}

export default RateAPI;
