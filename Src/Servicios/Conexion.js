import  axios  from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.11.52:8000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});


const RutasPublicas = ['/login','/registrar'];

api.interceptors.request.use(
    async (config) => {
     //verificar rutas si es publica 
        const isRutaPublica = RutasPublicas.some(route => config.url.includes(route));
        if (!isRutaPublica) {
            //solo añadir Token  rutas protegidas
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isRutaPublica = RutasPublicas.some(route => originalRequest.url.includes(route));

        if(error.response && error.response.status === 401 && !originalRequest._retry && !isRutaPublica) {
            originalRequest._retry = true;
            // Si la respuesta es 401, intentar refrescar el token
            console.log("Token expirado o no autorizado. Redirigiendo al login.");
            await AsyncStorage.removeItem('userToken');
        }
        return Promise.reject(error);
    }
    );

    export default api;


