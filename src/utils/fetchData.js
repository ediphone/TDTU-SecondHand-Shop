import { TOKEN_NAME, SERVER_API } from '../credentials';
import axios from 'axios';

const config = {
    headers:{
        'Access-Control-Allow-Origin': true,
    }
};

const axiosClient = axios.create({
    baseURL: 'http://localhost:9000/api/',
    headers:{
        'Access-Control-Allow-Origin': true,
    }
})

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const getMethod = async (url) => {
    // let token = localStorage.getItem(TOKEN_NAME);
    // if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${SERVER_API + url}`);
    // console.log(response);
    return response.data;
};

export const getMethodId = async (url, id = '') => {
    // let token = localStorage.getItem(TOKEN_NAME);
    // if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${SERVER_API + url + '/' + id}`);
    // console.log(response);
    return response.data;
};

export const getMethodParam = async (url, nameParam = '', param = '') => {
    // let token = localStorage.getItem(TOKEN_NAME);
    // if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${SERVER_API + url + '?' + nameParam + '=' + param}`);
    // console.log(response);
    return response.data;
};

export const postMethod = async (url = '', data = {}) => {
    // let token = localStorage.getItem(TOKEN_NAME);
    // if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(`${SERVER_API + url}`, data);
    return response.data;
};

export const deleteMethod = async (url = '', data = {}) => {
    let token = localStorage.getItem(TOKEN_NAME);
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.delete(`${SERVER_API + url}`, data);
    return response.data;
};
