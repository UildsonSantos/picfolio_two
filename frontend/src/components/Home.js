import React, { useState } from 'react';
import Login from './Login';
import { getToken, removeToken } from '../authService'; // Importando funções de autenticação
import Dashboard from './Dashboard/Dashboard'; // Importando o Dashboard

const Home = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken()); // Verifica se o usuário está logado

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLogout = () => {
        removeToken(); // Remove o token do localStorage
        setIsLoggedIn(false); // Atualiza o estado de login
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Atualiza o estado de login
        setShowLogin(false); // Fecha o formulário de login
    };

    return (
        <div>
            <nav>
                <h1>PicFólio</h1>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLoginClick}>Login</button>
                )}
            </nav>
            {showLogin && <Login onClose={handleCloseLogin} onLoginSuccess={handleLoginSuccess} />}
            {isLoggedIn ? (
                <Dashboard /> // Exibe o Dashboard se o usuário estiver logado
            ) : (
                <div>
                    <h2>Bem-vindo à página inicial!</h2>
                    <p>Conteúdo da página inicial aqui.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
