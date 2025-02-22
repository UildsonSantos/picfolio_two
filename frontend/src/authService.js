import api from './axiosConfig';


// Salvar tokens no localStorage
export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

// Buscar access token do localStorage
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

// Buscar refresh token do localStorage
export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

// Remover tokens do localStorage
export const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// Verificar se o usuário está autenticado
export const isAuthenticated = () => {
    return !!getAccessToken();
};

// Renovar access token usando refresh token
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error('Refresh token não encontrado.');
    }

    try {
        const response = await api.post('/api/auth/token', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        saveTokens(accessToken, newRefreshToken); // Salvar novo access token
        return accessToken
    } catch (error) {
        console.error("Error refreshing token:", error);
        removeTokens(); // Remover tokens em caso de erro
        throw error;
    }
};
