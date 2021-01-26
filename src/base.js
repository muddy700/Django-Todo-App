import axios from 'axios';

const token = 'code'

export default axios.create({
    baseURL: '/api/',
    headers: {'Authorization': 'Bearer '+token}
});
