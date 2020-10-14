import axios from 'axios';
import { API_URL } from '../helpers/API_URL';

export const uploadAction = async (image) => {
    const fd = new FormData();
    fd.append('image', image);
    const config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }

    try {
        const res = await axios.post('/api/images', fd, config);

        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}