import axios from 'axios';

const token = 'code'

export default axios.create({
    baseURL: '/api/v1/',
    // headers: {'Authorization': 'Bearer ' + token}
    // headers: {
    //     'Content-Type': 'application/json',
    // }
});
