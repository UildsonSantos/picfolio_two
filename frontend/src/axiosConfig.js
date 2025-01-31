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
        const status = error.response?.status;
        const message = error.response?.data?.message; // Obtém a mensagem do erro

        if (status === 401 && message === 'Token expirado.') { // Erro 401 específico para token expirado
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await refreshAccessToken();
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest); // Repete a requisição com o novo token
                } catch (err) {
                    console.error('Erro ao renovar access token:', err);
                    removeTokens();
                    return Promise.reject({
                        ...error,
                        message: 'Sessão expirada. Faça login novamente.',
                        logout: true,
                    });
                }
            }
        } else if (status === 401 && message === 'Acesso negado. Token não fornecido.') { //erro 401 para token nao fornecido
          removeTokens();
          return Promise.reject({
            ...error,
            message: 'Sessão expirada. Faça login novamente.',
            logout: true,
        });
        } else if (status === 403 && message === 'Token revogado.') { // Erro 403 específico para token revogado
            removeTokens();
            return Promise.reject({
                ...error,
                message: 'Token revogado. Faça login novamente.',
                logout: true,
            });
        } else if (status === 403 && message === 'Token inválido.') { // Erro 403 específico para token inválido
            removeTokens();
            return Promise.reject({
                ...error,
                message: 'Token inválido. Faça login novamente.',
                logout: true,
            });
        }

        return Promise.reject(error);
    }
);

export default api;
