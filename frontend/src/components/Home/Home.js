import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';

import './styles.css'; // Importando o arquivo CSS

const Home = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showHome, setShowHome] = useState(true);
    const { user, logout } = useContext(AuthContext);
    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLogout = () => {
        logout();
        setShowHome(true); // Redireciona para a Home após o logout
    };

    const handleHomeClick = () => {
        setShowHome(true);
    };

    const handleDashboardClick = () => {
        setShowHome(false);
    };


    return (
        <div>
            <nav className="navbar">
                <div>
                    <h1 className="navbar-brand">PicFólio</h1>
                    <button className={showHome ? "active" : ""} onClick={handleHomeClick}>
                        Home
                    </button>
                    {user && ( // Exibe o botão Dashboard apenas se o usuário estiver logado
                        <button className={!showHome ? "active" : ""} onClick={handleDashboardClick}>
                            Dashboard
                        </button>
                    )}
                </div>
                {user ? ( // Verifica se o usuário está logado
                    <div>
                        <span>Bem-vindo, {user.nome}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                ) : (
                    <div>
                        <span>Bem-vindo, Visitante</span>
                        <button onClick={handleLoginClick}>Login</button>
                    </div>
                )}
            </nav>
            {showLogin && <Login onClose={handleCloseLogin} onLoginSuccess={() => {
                setShowHome(false);
            }} />}
            {showHome ? (
                <div>
                    <h2>Bem-vindo Visitante à página inicial</h2>
                    <p>Conteúdo da página inicial aqui.</p>
                </div>
            ) : (
                <Dashboard />
            )}
        </div>
    );
};

export default Home;
