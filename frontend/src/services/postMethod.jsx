
import axios from 'axios';
import CustomAlert from '../components/modals/CustomerAlert';

export const post_data = async (route, credentials) => {
    console.log(credentials);
    try {
        const response = await axios.post(`/api${route}`, credentials , {
            withCredentials: true
        });
            
        if (response.status === 200) {
            CustomAlert('success',  response.data.message || 'Successful');
            return response.data;
        }

    } catch (err) {
        if (err.response) {
            console.log(err.response);
            // Extract message or error from backend
            const message = err.response.data.message || err.response.data.error || 'Unknown error';
            CustomAlert('error', message); // show error alert
        } else {
            CustomAlert('error', 'Server Error');
        }
    }
};