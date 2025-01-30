import axios from 'axios';
import { getAccessToken, refreshAccessToken, removeTokens } from './authService';

// URL base do backend
const API_BASE_URL = 'https://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para renovar o access token em caso de expiração
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Evitar loop de tentativas
            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // Repetir a requisição com o novo token
            } catch (err) {
                console.error('Erro ao renovar access token:', err);
                removeTokens(); // Remover tokens em caso de erro
                window.location.href = '/'; // Redirecionar para a página inicial
            }
        }
        return Promise.reject(error);
    }
);

export default api;
