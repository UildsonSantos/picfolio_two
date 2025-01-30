import { createContext, useState, useEffect } from "react";
import api from "../axiosConfig";
import { getRefreshToken, removeTokens } from "../authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar usuário no localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                await api.post('/api/auth/logout', { refreshToken });
            }
        } catch (err) {
            console.error('Erro ao fazer logout:', err);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
            removeTokens();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
