import axios from "axios";
const axiosClient = axios.create({
    baseURL: 'https://vietsubmovies.onrender.com',
    withCredentials:true,
})
export default axiosClient