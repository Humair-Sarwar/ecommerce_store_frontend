import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    }
});



export const signupApi = async (data)=>{
    let response;
    try {
        response = await api.post('/auth/signup', data);
    } catch (error) {
        return error;
    }
    return response;
}