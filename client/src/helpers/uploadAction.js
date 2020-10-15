import axios from 'axios';
import { API_URL } from '../helpers/API_URL';

export const uploadAction = async (image, email) => {
    const fd = new FormData();
    fd.append('image', image);
    const config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }

    try {
        console.log(email);
        const res = await axios.post('/api/image/' + email, fd, config);

        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}