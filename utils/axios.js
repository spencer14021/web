import Axios from 'axios';
import {API_BASE_URL} from "../constants";
import LocalSessionStorageService from "../services/LocalStorageService";


const localStorageService = LocalSessionStorageService.getService();

const axios = Axios.create({
    baseURL: API_BASE_URL,
    crossdomain: true,
});

axios.interceptors.request.use(
        config => {
            const token = localStorageService.getAccessToken();
            if (token) {
                config.headers['authorization'] = token;
            }
            // if (config.url.endsWith("upload_photo")){
            // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            // }
            return config;
        },
            error => {
                Promise.reject(error);
            });


axios.interceptors.response.use(response => {
        let authorization = response.headers['authorization'];
        let refreshToken = response.headers['refreshtoken'];
        authorization && localStorageService.setAccessToken(authorization);
        refreshToken && localStorageService.setRefreshToken(refreshToken);

        return response;
    },

     function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            return axios.post('/refresh',
                {},{
                    headers: {
                        refreshToken: localStorageService.getRefreshToken()
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        localStorageService.setAccessToken(res.headers["authorization"]);
                        localStorageService.setRefreshToken(res.headers["refreshtoken"]);

                        axios.defaults.headers.common['authorization'] = localStorageService.getAccessToken();

                        return axios(originalRequest);
                    }
                })
        }

        return Promise.reject(error);
    });

export default axios;