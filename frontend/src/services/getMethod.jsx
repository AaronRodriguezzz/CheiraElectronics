import axios from 'axios';
import CustomAlert from '../components/modals/CustomerAlert';

export const get_data = async (route, page) => {
    try {
        const response = await axios.get(`/api${route}`, {
            params: { page: page},
            withCredentials: true,
        });
        
        if (response.status === 200) {
            return response.data    
        }
    } catch (err) {
        if (err.response) {
            // Extract message or error from backend
            const message = err.response.data.message || err.response.data.error || 'Unknown error';
            CustomAlert('error', message); // show error alert
        } else {
            CustomAlert('error', 'Server Error');
        }
    }
};