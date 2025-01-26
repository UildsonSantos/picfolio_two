// Salvar o token no localStorage
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

// Buscar o token do localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Remover o token do localStorage
export const removeToken = () => {
    localStorage.removeItem('token');
};

// Verificar se o usuário está autenticado
export const isAuthenticated = () => {
    return !!getToken();
};
