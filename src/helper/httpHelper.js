import axios from 'axios';
export const httpAxios = axios.create({               //It is an instance of Axios through which we are using Axios 
    baseURL:process.env.BASE_URL,
})