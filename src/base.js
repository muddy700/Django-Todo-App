import axios from 'axios';

export default axios.create({
    baseURL: '/api/'
    // baseURL: '/api/v1/'
});
